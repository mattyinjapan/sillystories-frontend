import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./StoryDetailPage.css";

interface StoryVariable {
    id: number;
    key: string;
    label: string;
    default_value: string;
}

interface StorySection {
    id: number;
    type: string;
    text_content: string | null;
    image_path: string | null;
    order: number;
}

interface Story {
    id: number;
    title: string;
    title_image_path: string | null;
    variables: StoryVariable[];
    sections: StorySection[];
}

export default function StoryDetailPage() {
    const { id } = useParams();
    const [story, setStory] = useState<Story | null>(null);
    const [loading, setLoading] = useState(true);

    const [showCustomize, setShowCustomize] = useState(false);
    const [variableValues, setVariableValues] = useState<Record<string, string>>({});

    useEffect(() => {
        fetchStory();
    }, [id]);

    const fetchStory = async () => {
        try {
        const baseUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${baseUrl}/api/stories/${id}`);
        const data = await response.json();
        setStory(data);

        // Initialize editable variable values
        const initialValues: Record<string, string> = {};
        data.variables.forEach((variable: StoryVariable) => {
            initialValues[variable.key] = variable.default_value;
        });
        setVariableValues(initialValues);

        } catch (error) {
        console.error("Error fetching story:", error);
        } finally {
        setLoading(false);
        }
    };

    const handleVariableChange = (key: string, value: string) => {
        setVariableValues((prev) => ({
        ...prev,
        [key]: value,
        }));
    };

    const handleCancelCustomize = () => {
        if (!story) return;

        const resetValues: Record<string, string> = {};
        story.variables.forEach((variable) => {
            resetValues[variable.key] = variable.default_value;
        });

        setVariableValues(resetValues);
        setShowCustomize(false);
    };

  const replaceVariables = (text: string) => {
    if (!story) return text;

    let updatedText = text;

    // story.variables.forEach((variable) => {
    //   const regex = new RegExp(`\\{${variable.key}\\}`, "g");
    //   updatedText = updatedText.replace(
    //     regex,
    //     variable.default_value || ""
    //   );
    // });

    Object.keys(variableValues).forEach((key) => {
        const regex = new RegExp(`\\{${key}\\}`, "g");
        updatedText = updatedText.replace(regex, variableValues[key] || "");
        });

        return updatedText;
    };

    const handleDownload = async () => {
  if (!story) return;

  try {
    const baseUrl = import.meta.env.VITE_API_URL;

    const response = await fetch(
        `${baseUrl}/api/stories/${story.id}/download`,
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            variables: variableValues
            })
        }
        );

        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${story.title}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error("Error downloading PDF:", error);
        }
    };

    if (loading) return <p className="story-loading">Loading story...</p>;
    if (!story) return <p>Story not found.</p>;

    return (
        <div className="story-detail-page">
            <div className="story-container">
                <h1 className="story-title">{story.title}</h1>

                {/* ACTION BUTTONS */}
                <div className="story-actions">
                <button className="download-btn" onClick={handleDownload}>
                    Download
                </button>

                <button
                    className="customize-btn"
                    onClick={() => setShowCustomize(!showCustomize)}
                >
                    🎨 Customize
                </button>
                </div>

                {/* CUSTOMIZE PANEL */}
                {showCustomize && (
                <div className="customize-panel">
                    {story.variables.map((variable) => (
                    <div key={variable.id} className="variable-field">
                        <label>{variable.label}</label>
                        <input
                        type="text"
                        value={variableValues[variable.key] || ""}
                        onChange={(e) =>
                            handleVariableChange(variable.key, e.target.value)
                        }
                        />
                    </div>
                    ))}

                    <div className="customize-actions">
                    <button
                        className="update-btn"
                        onClick={() => setShowCustomize(false)}
                    >
                        Update Story
                    </button>

                    <button
                        className="cancel-btn"
                        onClick={handleCancelCustomize}
                    >
                        Cancel
                    </button>
                    </div>
                </div>
                )}

                {/* TITLE IMAGE */}

                {story.title_image_path && (
                    <img
                    src={`${import.meta.env.VITE_API_URL}/storage/${story.title_image_path}`}
                    alt={story.title}
                    className="story-cover"
                    />
                )}

                {story.sections.map((section) => {
                    const text = section.text_content
                    ? replaceVariables(section.text_content)
                    : null;

                    switch (section.type) {
                    case "text":
                        return (
                        <div key={section.id} className="story-section">
                            <p className="story-text">{text}</p>
                        </div>
                        );

                    case "image":
                        return (
                        <div key={section.id} className="story-section">
                            <img
                            src={`${import.meta.env.VITE_API_URL}/storage/${section.image_path}`}
                            alt=""
                            className="story-image"
                            />
                        </div>
                        );

                    case "text_left_image_right":
                        return (
                        <div key={section.id} className="story-row">
                            <p className="story-text-half">{text}</p>
                            <img
                            src={`${import.meta.env.VITE_API_URL}/storage/${section.image_path}`}
                            alt=""
                            className="story-image-half"
                            />
                        </div>
                        );

                    case "image_left_text_right":
                        return (
                        <div key={section.id} className="story-row">
                            <img
                            src={`${import.meta.env.VITE_API_URL}/storage/${section.image_path}`}
                            alt=""
                            className="story-image-half"
                            />
                            <p className="story-text-half">{text}</p>
                        </div>
                        );

                    default:
                        return null;
                    }
                })}
            </div>
        </div>
        
    );
}

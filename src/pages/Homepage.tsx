import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.css";

interface Story {
    id: number;
    title: string;
}

export default function HomePage() {
    const [stories, setStories] = useState<Story[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchStories();
    }, []);

    const fetchStories = async () => {
        try {
            const baseUrl = import.meta.env.VITE_API_URL;
            const response = await fetch(`${baseUrl}/api/stories`);
            const data = await response.json();
            setStories(data);
        } catch (error) {
            console.error("Error fetching stories:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p className="home-loading">Loading stories...</p>;

  return (
    <> 

        {/* <div className="home-container">
            <h2 className="home-heading">Top Stories</h2>

            <div className="story-list">
                {stories.map((story, index) => (
                <div
                    key={story.id}
                    className="story-card"
                    onClick={() => navigate(`/stories/${story.id}`)}
                >
                    <div className="story-left">
                    <span className="story-number">{index + 1}</span>
                    <span className="story-title">{story.title}</span>
                    </div>

                    <div className="story-play">▶</div>
                </div>
                ))}
            </div>
        </div> */}
        <div className="home-wrapper">
            {/* Floating Clouds */}
            <div className="cloud cloud-1"></div>
            <div className="cloud cloud-2"></div>
            <div className="cloud cloud-3"></div>

            <div className="home-container">
                 <main style={{ padding: "2rem", textAlign: "center" }}>
                    <h2>Welcome to Silly Stories</h2>
                    <p>Create, read and share the silliest stories ever told.</p>
                </main>
                <h2 className="home-heading">Top Stories</h2>

                <div className="story-list">
                    {stories.map((story, index) => (
                    <div
                        key={story.id}
                        className="story-card"
                        onClick={() => navigate(`/stories/${story.id}`)}
                    >
                        <div className="story-left">
                        <span className="story-number">{index + 1}</span>
                        <span className="story-title">{story.title}</span>
                        </div>

                        <div className="story-play">▶</div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    </>
  );
}

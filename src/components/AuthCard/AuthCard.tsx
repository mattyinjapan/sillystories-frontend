import './AuthCard.css';

type Props = {
  children: React.ReactNode;
};

export default function AuthCard({ children }: Props) {
  return (
    <div className="auth-page">
      <div className="auth-card">{children}</div>
    </div>
  );
}

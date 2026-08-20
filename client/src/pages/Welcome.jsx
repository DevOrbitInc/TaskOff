import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <section
      className="relative w-full min-h-screen bg-paper flex flex-col items-center justify-center text-center px-6 py-16"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 700px 400px at 50% 0%, rgba(59,91,253,0.14), rgba(255,255,255,0) 70%)",
      }}
    >
      {/* Badge */}
      <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-section px-4 py-1.5 text-[13px] text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-green" />
        Built by the team, for the team
      </div>

      {/* Headline */}
      <h1 className="max-w-[640px] text-[40px] font-bold leading-[1.2] tracking-tight text-ink">
        Work that moves, tracked{" "}
        <span className="text-signal">without the noise.</span>
      </h1>

      {/* Subtitle */}
      <p className="mt-5 max-w-[520px] text-[15px] font-medium leading-relaxed text-muted">
        TaskOff keeps your team's work visible — every task, every status, one
        clear board.
      </p>

      {/* Actions */}
      <div className="mt-8 flex gap-3">
        <Button variant="primary" onClick={() => navigate("/register")}>
          Get started
        </Button>
        <Button variant="secondary" onClick={() => navigate("/login")}>
          Log in
        </Button>
      </div>
    </section>
  );
}

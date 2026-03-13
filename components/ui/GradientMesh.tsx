export function GradientMesh() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#060a18]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.14),_transparent_45%),radial-gradient(circle_at_80%_20%,_rgba(99,102,241,0.18),_transparent_35%),radial-gradient(circle_at_20%_80%,_rgba(45,212,191,0.14),_transparent_40%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:58px_58px] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]" />
    </div>
  );
}

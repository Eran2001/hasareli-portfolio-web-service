export function WhySection({ text }: { text: string }) {
  const [before, after] = text.split('think')

  return (
    <section className="section" data-screen-label="02 Why I Exist">
      <div className="why">
        <div className="label">02 — why i exist</div>
        <p>
          {before}
          <span className="gradient-text">think</span>
          {after}
        </p>
      </div>
    </section>
  )
}

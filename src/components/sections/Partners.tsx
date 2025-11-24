const logos = [
  'https://dummyimage.com/120x40/000/fff&text=KNUST',
  'https://dummyimage.com/120x40/000/fff&text=SCISA',
  'https://dummyimage.com/120x40/000/fff&text=Sponsor',
  'https://dummyimage.com/120x40/000/fff&text=Lab',
];

const Partners = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container-custom flex flex-wrap items-center justify-center gap-10 opacity-80">
        {logos.map((src, idx) => (
          <img key={idx} src={src} alt="partner" className="h-8 md:h-10 object-contain" />
        ))}
      </div>
    </section>
  );
};

export default Partners;



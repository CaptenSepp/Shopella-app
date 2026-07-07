type Props = {
  src: string;
  alt: string;
  title?: string;
  loading?: 'lazy' | 'eager';
};

const FullBleedImage: React.FC<Props> = ({ src, alt, title, loading = 'lazy' }) => ( // full-bleed image section
  <div className="full-bleed">
    <img className="flex-column__banner w-full h-auto" src={src} alt={alt} loading={loading} /> {/* edge-to-edge banner */}
    {title ? <h2 className="full-bleed__title">{title}</h2> : null} {/* optional image title */}
  </div>
);

export default FullBleedImage;
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Play, ZoomIn } from "lucide-react";
import GalleryLightbox from "../ui/GalleryLightbox";
import {
  galleryCategories,
  photoGallery,
  videoGallery,
  graphicGallery,
  motionGallery,
} from "../../data/gallery";

// ============================================================
// PHOTO ITEM
// ============================================================
function PhotoItem({ item, index, onClick }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, delay: index * 0.025 }}
      whileHover={{ scale: 1.02 }}
      onClick={() => onClick(index)}
      className="group relative rounded-xl overflow-hidden aspect-square focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
      aria-label={item.alt}
    >
      {!error ? (
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.3s ease, transform 0.5s ease",
          }}
        />
      ) : (
        // Error state — image failed to load
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-white/15 text-xs font-medium">
            Image {index + 1}
          </span>
        </div>
      )}

      {/* Skeleton while loading */}
      {!loaded && !error && (
        <div className="absolute inset-0 animate-shimmer" />
      )}

      {/* Hover overlay — minimal, functional */}
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <ZoomIn size={20} className="text-white/80" />
      </div>
    </motion.button>
  );
}

// ============================================================
// VIDEO ITEM
// ============================================================
function VideoItem({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group relative rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.022)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Thumbnail / placeholder */}
      <div
        className="relative flex items-center justify-center"
        style={{
          height: "180px",
          background:
            "linear-gradient(160deg, rgba(59,130,246,0.07) 0%, rgba(139,92,246,0.05) 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {item.youtubeId ? (
          // If YouTube ID exists, show embed thumbnail
          <img
            src={`https://img.youtube.com/vi/${item.youtubeId}/mqdefault.jpg`}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : null}

        {/* Play button — functional icon usage */}
        <button
          className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all"
          style={{
            background: item.youtubeId
              ? "rgba(0,0,0,0.6)"
              : "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.18)",
          }}
          onClick={() => {
            if (item.youtubeId) {
              window.open(
                `https://www.youtube.com/watch?v=${item.youtubeId}`,
                "_blank",
              );
            }
          }}
          aria-label={`Play ${item.title}`}
          disabled={!item.youtubeId}
        >
          <Play size={18} className="text-white ml-0.5" fill="white" />
        </button>

        {/* Tag — top right */}
        <span
          className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-lg"
          style={{
            background: "rgba(59,130,246,0.15)",
            color: "#60A5FA",
            border: "1px solid rgba(59,130,246,0.25)",
          }}
        >
          {item.tag}
        </span>
      </div>

      <div className="p-5">
        <h4 className="font-display font-bold text-white/88 text-base mb-1.5">
          {item.title}
        </h4>
        <p className="text-sm text-white/45 leading-relaxed">
          {item.description}
        </p>
        {/* TODO: Add YouTube link and update description in gallery.js */}
        {!item.youtubeId && (
          <p className="text-xs text-white/22 mt-3 italic">
            Video link not yet added
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ============================================================
// CREATIVE / GRAPHIC ITEM
// ============================================================
function CreativeItem({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.022)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
      onClick={() => {
        if (item.youtubeId) {
          window.open(`https://www.youtube.com/watch?v=${item.youtubeId}`, "_blank");
        }
      }}
    >
      {/* Preview area */}
      <div
        className="relative flex items-end p-4"
        style={{
          height: "140px",
          background: item.youtubeId
            ? "transparent"
            : item.image
            ? `url(${item.image}) center/cover`
            : `linear-gradient(160deg, ${item.color}10 0%, ${item.color}04 100%)`,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          overflow: "hidden",
        }}
      >
        {/* YouTube thumbnail if available */}
        {item.youtubeId && (
          <img
            src={`https://img.youtube.com/vi/${item.youtubeId}/mqdefault.jpg`}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
        {/* Play icon if YouTube */}
        {item.youtubeId && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.2)" }}>
              <Play size={16} className="text-white ml-0.5" fill="white" />
            </div>
          </div>
        )}
        {/* Tag */}
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-lg relative z-10"
          style={{
            background: `${item.color}18`,
            color: item.color,
            border: `1px solid ${item.color}25`,
          }}
        >
          {item.tag}
        </span>
      </div>

      <div className="p-5">
        <h4 className="font-display font-bold text-white/88 text-base mb-1.5">
          {item.title}
        </h4>
        <p className="text-sm text-white/45 leading-relaxed">
          {item.description}
        </p>
        {!item.image && !item.youtubeId && (
          <p className="text-xs text-white/22 mt-3 italic">
            Preview image not yet added
          </p>
        )}
      </div>
    </motion.div>
  );
}


// ============================================================
// GALLERY SECTION
// ============================================================
export default function Gallery() {
  const [activeTab, setActiveTab] = useState("photography");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  const photos = photoGallery;

  const renderContent = () => {
    switch (activeTab) {
      case "photography":
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
            {photos.map((item, i) => (
              <PhotoItem
                key={item.id}
                item={item}
                index={i}
                onClick={setLightboxIndex}
              />
            ))}
          </div>
        );
      case "videography":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videoGallery.map((item, i) => (
              <VideoItem key={item.id} item={item} index={i} />
            ))}
          </div>
        );
      case "graphic":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {graphicGallery.map((item, i) => (
              <CreativeItem key={item.id} item={item} index={i} />
            ))}
          </div>
        );
      case "motion":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {motionGallery.map((item, i) => (
              <CreativeItem key={item.id} item={item} index={i} />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="gallery"
      className="section-padding relative overflow-hidden"
      aria-label="Gallery section"
    >
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-4 mb-12"
        >
          <span className="section-subtitle">Creative Work</span>
          <h2 className="section-title font-display">
            Gallery & <span className="text-gradient-blue">Showcase</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl leading-relaxed">
            Photography, video production, graphic design, and motion work.
          </p>
        </motion.div>

        {/* Tabs — text only, no decorative symbols */}
        <div className="flex flex-wrap gap-2 mb-10">
          {galleryCategories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              whileTap={{ scale: 0.97 }}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-250 ${
                activeTab === cat.id
                  ? "bg-white text-black"
                  : "glass border border-white/10 text-white/55 hover:text-white hover:border-white/20"
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          images={photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((prev) => Math.max(0, prev - 1))}
          onNext={() =>
            setLightboxIndex((prev) => Math.min(photos.length - 1, prev + 1))
          }
        />
      )}
    </section>
  );
}

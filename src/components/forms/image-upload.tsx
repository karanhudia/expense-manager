import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  image: string | null;
  onChange: (image: string | null) => void;
  label?: string;
  error?: string;
  className?: string;
}

export function ImageUpload({
  image,
  onChange,
  label,
  error,
  className,
}: ImageUploadProps) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && <label className="text-sm font-medium">{label}</label>}
      <div
        className={cn(
          "relative flex h-32 w-full items-center justify-center rounded-lg border border-dashed",
          error && "border-red-500"
        )}
      >
        {image ? (
          <>
            <Image
              src={image}
              alt="Uploaded"
              fill
              className="object-cover"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute right-2 top-2 h-6 w-6"
              onClick={() => onChange(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <label className="flex cursor-pointer flex-col items-center justify-center">
            <ImageIcon className="h-8 w-8 text-gray-400" />
            <span className="mt-2 text-sm text-gray-500">
              Click to upload or drag and drop
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
} 
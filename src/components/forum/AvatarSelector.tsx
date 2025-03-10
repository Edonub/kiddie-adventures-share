
import { Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AvatarSelectorProps {
  onSelect: (avatarUrl: string) => void;
}

const avatarOptions = [
  {
    id: "default1",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka"
  },
  {
    id: "default2",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
  },
  {
    id: "default3",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mimi"
  },
  {
    id: "default4",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe"
  },
  {
    id: "default5",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abby"
  },
  {
    id: "default6",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Paco"
  },
  {
    id: "default7",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juan"
  },
  {
    id: "default8",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
  },
  {
    id: "default9",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia"
  },
  {
    id: "default10",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ramon"
  },
  {
    id: "default11",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucia"
  },
  {
    id: "default12",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro"
  },
];

const AvatarSelector = ({ onSelect }: AvatarSelectorProps) => {
  return (
    <div className="grid grid-cols-3 gap-3 my-4">
      {avatarOptions.map((avatar) => (
        <Button
          key={avatar.id}
          variant="outline"
          className="p-1 h-auto aspect-square flex items-center justify-center border border-[#555] hover:border-white hover:bg-[#333]"
          onClick={() => onSelect(avatar.url)}
        >
          <img
            src={avatar.url}
            alt={`Avatar ${avatar.id}`}
            className="w-full h-full rounded-md"
          />
        </Button>
      ))}
      <Button
        variant="outline"
        className="p-1 h-auto aspect-square flex items-center justify-center border border-[#555] hover:border-white hover:bg-[#333] text-gray-300"
      >
        <Grid3X3 size={24} />
        <span className="sr-only">Más opciones</span>
      </Button>
    </div>
  );
};

export default AvatarSelector;


import { Button } from "@/components/ui/button";
import { List, Map } from "lucide-react";

interface ViewToggleProps {
  view: "list" | "map";
  onViewChange: (view: "list" | "map") => void;
}

const ViewToggle = ({ view, onViewChange }: ViewToggleProps) => {
  return (
    <div className="flex items-center justify-center bg-white rounded-lg shadow p-1 w-fit">
      <Button
        variant={view === "list" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("list")}
        className="flex items-center gap-2"
      >
        <List size={16} />
        <span className="hidden sm:inline">Lista</span>
      </Button>
      <Button
        variant={view === "map" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("map")}
        className="flex items-center gap-2"
      >
        <Map size={16} />
        <span className="hidden sm:inline">Mapa</span>
      </Button>
    </div>
  );
};

export default ViewToggle;

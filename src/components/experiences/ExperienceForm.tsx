
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload } from "lucide-react";
import ImageUploader from "./ImageUploader";

interface ExperienceFormProps {
  isEditMode: boolean;
  initialData: {
    title: string;
    description: string;
    location: string;
    category: string;
    price: string;
    imageUrl: string;
    ageRange: string;
    isPremium: boolean;
  };
  experienceId?: string;
  userId: string;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ 
  isEditMode, 
  initialData,
  experienceId,
  userId
}) => {
  const navigate = useNavigate();
  
  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);
  const [location, setLocation] = useState(initialData.location);
  const [category, setCategory] = useState(initialData.category);
  const [price, setPrice] = useState(initialData.price);
  const [imageUrl, setImageUrl] = useState(initialData.imageUrl);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [ageRange, setAgeRange] = useState(initialData.ageRange);
  const [isPremium, setIsPremium] = useState(initialData.isPremium);
  const [loading, setLoading] = useState(false);

  const uploadImage = async (): Promise<string | null> => {
    if (!selectedFile) return imageUrl;

    setUploading(true);
    try {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${fileName}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from('activity_images')
        .upload(filePath, selectedFile);
        
      if (uploadError) {
        throw uploadError;
      }
      
      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('activity_images')
        .getPublicUrl(filePath);
        
      return publicUrl;
    } catch (error: any) {
      toast.error(`Error al subir la imagen: ${error.message}`);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId) {
      toast.error("Debes iniciar sesión para crear experiencias");
      navigate("/auth");
      return;
    }
    
    setLoading(true);
    
    try {
      // Upload image if a file has been selected
      const finalImageUrl = await uploadImage();
      
      if (uploading) {
        toast.error("Espera a que la imagen termine de subir");
        return;
      }
      
      const activityData = {
        title,
        description,
        location,
        category,
        price: parseFloat(price),
        image_url: finalImageUrl || imageUrl,
        age_range: ageRange,
        is_premium: isPremium,
        creator_id: userId,
      };
      
      let error;
      
      if (isEditMode && experienceId) {
        // Update existing experience
        const response = await supabase
          .from("activities")
          .update(activityData)
          .eq("id", experienceId)
          .eq("creator_id", userId);
          
        error = response.error;
        
        if (!error) {
          toast.success("Experiencia actualizada exitosamente");
        }
      } else {
        // Create new experience
        const response = await supabase
          .from("activities")
          .insert([activityData]);
          
        error = response.error;
        
        if (!error) {
          toast.success("Experiencia creada exitosamente");
        }
      }
      
      if (error) throw error;
      
      navigate("/mis-experiencias");
    } catch (error: any) {
      toast.error(error.message || "Error al guardar la experiencia");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Título de la Experiencia</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Taller de manualidades en familia"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="Describe la experiencia, qué incluye, qué van a aprender los niños, etc."
          className="min-h-[150px]"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="location">Ubicación</Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            placeholder="Madrid, Centro Cultural"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Categoría</Label>
          <Input
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            placeholder="Arte, Naturaleza, Educación..."
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="price">Precio (€)</Label>
          <Input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="ageRange">Rango de Edad Recomendado</Label>
          <Input
            id="ageRange"
            value={ageRange}
            onChange={(e) => setAgeRange(e.target.value)}
            required
            placeholder="3-8 años"
          />
        </div>
      </div>
      
      <ImageUploader 
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
      />
      
      <div className="flex items-center space-x-2">
        <Checkbox
          id="isPremium"
          checked={isPremium}
          onCheckedChange={(checked) => setIsPremium(checked as boolean)}
        />
        <Label htmlFor="isPremium">Marcar como Experiencia Premium</Label>
      </div>
    
      <Button type="submit" className="w-full" disabled={loading || uploading}>
        {loading ? (isEditMode ? "Actualizando..." : "Creando...") : (isEditMode ? "Actualizar Experiencia" : "Crear Experiencia")}
      </Button>
    </form>
  );
};

export default ExperienceForm;

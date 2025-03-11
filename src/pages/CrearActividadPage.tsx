
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import { Upload } from "lucide-react";

const CrearActividadPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("0");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [ageRange, setAgeRange] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      fetchExperienceData();
    }
  }, [id, user]);

  const fetchExperienceData = async () => {
    if (!user || !id) return;

    setInitialLoading(true);
    try {
      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .eq("id", id)
        .eq("creator_id", user.id)
        .single();

      if (error) {
        toast.error("No se pudo cargar la experiencia");
        navigate("/mis-experiencias");
        return;
      }

      if (data) {
        setTitle(data.title || "");
        setDescription(data.description || "");
        setLocation(data.location || "");
        setCategory(data.category || "");
        setPrice(data.price ? data.price.toString() : "0");
        setImageUrl(data.image_url || "");
        setAgeRange(data.age_range || "");
        setIsPremium(data.is_premium || false);
      }
    } catch (error) {
      console.error("Error fetching experience:", error);
      toast.error("Error al cargar la experiencia");
    } finally {
      setInitialLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      // Clear the URL input when a file is selected
      setImageUrl("");
    }
  };

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
    
    if (!user) {
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
        creator_id: user.id,
      };
      
      let error;
      
      if (isEditMode) {
        // Update existing experience
        const response = await supabase
          .from("activities")
          .update(activityData)
          .eq("id", id)
          .eq("creator_id", user.id);
          
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
  
  if (initialLoading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto p-6 max-w-3xl">
          <div className="flex justify-center items-center h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            <p className="ml-4 text-gray-600">Cargando experiencia...</p>
          </div>
        </div>
      </>
    );
  }
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {isEditMode ? "Editar Experiencia" : "Crear Nueva Experiencia"}
            </CardTitle>
            <CardDescription>
              {isEditMode 
                ? "Actualiza los detalles de tu experiencia" 
                : "Comparte actividades y experiencias interesantes para familias"}
            </CardDescription>
          </CardHeader>
          <CardContent>
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
              
              <div className="space-y-2">
                <Label htmlFor="image">Imagen de la Experiencia</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Subir una imagen</Label>
                    <div className="flex items-center gap-4">
                      <Button 
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Seleccionar Archivo
                      </Button>
                      <Input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                    {selectedFile && (
                      <p className="text-sm text-green-600 mt-1">
                        Archivo seleccionado: {selectedFile.name}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="imageUrl" className="text-sm text-muted-foreground">
                      O introducir URL de una imagen
                    </Label>
                    <Input
                      id="imageUrl"
                      value={imageUrl}
                      onChange={(e) => {
                        setImageUrl(e.target.value);
                        setSelectedFile(null);
                      }}
                      placeholder="https://ejemplo.com/imagen.jpg"
                      disabled={!!selectedFile}
                    />
                  </div>
                </div>
                {imageUrl && (
                  <div className="mt-2">
                    <img 
                      src={imageUrl} 
                      alt="Preview" 
                      className="max-h-32 border rounded-md"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/600x400?text=Error+al+cargar";
                      }}
                    />
                  </div>
                )}
                <p className="text-sm text-muted-foreground mt-1">
                  Añade una imagen para ilustrar la experiencia
                </p>
              </div>
              
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
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-muted-foreground">
            Gracias por contribuir a la comunidad de Familea
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default CrearActividadPage;

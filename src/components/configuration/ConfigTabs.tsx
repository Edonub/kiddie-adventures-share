
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalDataTab from "@/pages/configuracion/tabs/PersonalDataTab";
import SecurityTab from "@/pages/configuracion/tabs/SecurityTab";
import ContactTab from "@/pages/configuracion/tabs/ContactTab";
import BankAccountTab from "@/pages/configuracion/tabs/BankAccountTab";
import { TabProps } from "@/pages/configuracion/types";

interface ConfigTabsProps extends TabProps {}

const ConfigTabs = ({ userProfile, user }: ConfigTabsProps) => {
  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="personal">Datos personales</TabsTrigger>
        <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
        <TabsTrigger value="contacto">Contacto</TabsTrigger>
        <TabsTrigger value="bancaria">Cuenta bancaria</TabsTrigger>
      </TabsList>
      
      <TabsContent value="personal">
        <PersonalDataTab userProfile={userProfile} user={user} />
      </TabsContent>
      
      <TabsContent value="seguridad">
        <SecurityTab />
      </TabsContent>
      
      <TabsContent value="contacto">
        <ContactTab userProfile={userProfile} user={user} />
      </TabsContent>
      
      <TabsContent value="bancaria">
        <BankAccountTab userProfile={userProfile} user={user} />
      </TabsContent>
    </Tabs>
  );
};

export default ConfigTabs;

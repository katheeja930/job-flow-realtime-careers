
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BrandingCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Branding</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <h3 className="text-lg mb-4">Customize your company branding</h3>
          <p className="text-muted-foreground mb-6">
            Upload your company colors, logo variations, and branded media
          </p>
          <Button>Customize Branding</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrandingCard;

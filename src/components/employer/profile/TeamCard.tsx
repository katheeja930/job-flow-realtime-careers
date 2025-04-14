
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TeamCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <h3 className="text-lg mb-4">Add team members to your company</h3>
          <p className="text-muted-foreground mb-6">
            Invite colleagues to help manage job listings and applications
          </p>
          <Button>Add Team Members</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamCard;

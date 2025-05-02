import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { beliefData, meetingData, heroContent, pastorMessageContent, scriptureBannerContent, bibleImageContent } from "@/lib/church-data";

const Dashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <Link href="/">
          <a className="text-primary hover:underline mb-8 inline-block">&larr; Back to Website</a>
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-8">Website Content Management</h1>
      <p className="text-lg mb-8 p-4 bg-amber-50 border border-amber-200 rounded-md">
        <strong>Note:</strong> The website now uses static content files instead of a CMS. 
        To update content, you need to edit the source files directly in <code>client/src/lib/church-data.ts</code>.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
            <CardDescription>Main homepage banner content</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-2"><strong>Title:</strong> {heroContent.title}</p>
            <p className="mb-2"><strong>Subtitle:</strong> {heroContent.subtitle}</p>
            <p className="mb-2 line-clamp-2"><strong>Content:</strong> {heroContent.content}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pastor's Message</CardTitle>
            <CardDescription>Message from our pastor</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-2"><strong>Name:</strong> {pastorMessageContent.name}</p>
            <p className="mb-2"><strong>Position:</strong> {pastorMessageContent.position}</p>
            <p className="mb-2 line-clamp-2"><strong>Content:</strong> {pastorMessageContent.content.substring(0, 100)}...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scripture Banner</CardTitle>
            <CardDescription>Featured scripture passage</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-2"><strong>Content:</strong> "{scriptureBannerContent.content}"</p>
            <p className="mb-2"><strong>Reference:</strong> {scriptureBannerContent.reference}</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4 mt-8">Meeting Schedule</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {meetingData.map(meeting => (
          <Card key={meeting.id}>
            <CardHeader>
              <CardTitle>{meeting.title}</CardTitle>
              <CardDescription>{meeting.day} at {meeting.time}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-2"><strong>Location:</strong> {meeting.location}</p>
              {meeting.description && (
                <p className="mb-2"><strong>Description:</strong> {meeting.description}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4 mt-8">Our Beliefs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {beliefData.slice(0, 6).map(belief => (
          <Card key={belief.id}>
            <CardHeader>
              <CardTitle>{belief.title}</CardTitle>
              <CardDescription className="line-clamp-2">{belief.summary}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-2 line-clamp-3">{belief.content.substring(0, 150)}...</p>
              <p className="text-sm text-gray-500">{belief.scripture}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
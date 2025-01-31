import { Layout } from '@/components/layout';
import { AlertCard } from '@/components/ui';
import { Question } from '@/components/icons';

const NotFound = () => {
  return (
    <Layout
      title="Page Not Found"
      description="Sorry, the page you're looking for doesn't exist or has been moved."
      centerContent
      withHeader={false}
    >
      <AlertCard
        icon={<Question />}
        title="Page Not Found"
        message="It seems like the page you're trying to access doesn't exist. Check the URL or explore other sections."
        buttonText="Return to Home"
        link="/"
      />
    </Layout>
  );
};

export default NotFound;

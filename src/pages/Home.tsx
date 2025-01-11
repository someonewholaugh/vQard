import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { Create } from '@/components/icons';

const Home = () => {
  return (
    <Layout title="Home" centerContent>
      <div className="space-y-8 text-center">
        <div className="max-w-2xl space-y-3 md:space-y-4">
          <h1 className="text-4xl md:text-5xl text-pretty">
            Create Your Online Virtual Card Effortlessly, No Login Required
          </h1>
          <p className="text-sm tracking-wide text-stone-400 text-pretty">
            Simplify networking with a personalized vCard. No sign-ups, no barriers – just your
            information, beautifully organized and ready to share.
          </p>
        </div>
        <div>
          <Link to="/create">
            <Button className="w-full mx-auto" icon={<Create color="black" />}>
              Create Now
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

import { Header, Footer } from "./components/layout";
import {
  Button,
  DepartmentCard,
  NewsCard,
  ExecutiveCard,
  SectionTitle,
} from "./components/ui";
import homeImg from "./assets/images/home_img.jpg";

function App() {
  // Sample data for demonstration
  const departments = [
    {
      image:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&q=80",
      title: "Computer Science",
      description: "Advancing computational thinking and innovation",
      href: "/departments/computer-science",
    },
    {
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80",
      title: "Chemistry",
      description: "Exploring molecules, structures and reactions",
      href: "/departments/chemistry",
    },
    {
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80",
      title: "Physics",
      description: "Understanding the fundamental laws of nature",
      href: "/departments/physics",
    },
    {
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80",
      title: "Mathematics",
      description: "Building analytical and problem-solving skills",
      href: "/departments/mathematics",
    },
  ];

  const newsItems = [
    {
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80",
      category: "Research",
      title: "KNUST Scientists Make Breakthrough in Nanotechnology Research",
      date: "October 1, 2023",
      href: "/news/nanotechnology",
    },
    {
      image:
        "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&q=80",
      category: "Awards",
      title: "College Wins Top Academic Excellence Award",
      date: "September 25, 2023",
      href: "/news/awards",
    },
    {
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80",
      category: "Community",
      title: "Students Launch Community Outreach Program",
      date: "September 18, 2023",
      href: "/news/outreach",
    },
  ];

  const executives = [
    {
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
      name: "Dr. Sarah Mensah",
      title: "President",
    },
    {
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
      name: "Emmanuel Osei",
      title: "Vice President",
    },
    {
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
      name: "Augusta Adjei",
      title: "General Secretary",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="bg-gradient-to-r from-black/50 to-black/50 bg-cover bg-center py-28 text-white"
          style={{ backgroundImage: `url(${homeImg})` }}
        >
          <div className="container-custom">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Discover Science. Transform Your Future.
            </h1>
            <p className="text-xl mb-8 max-w-2xl leading-relaxed">
              The College of Science at KNUST is Ghana's premier institution for
              scientific excellence, innovation, and discovery.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button variant="primary" href="/about">
                Learn More
              </Button>
              <Button variant="secondary" href="/app">
                Join the Waitlist
              </Button>
            </div>
          </div>
        </section>

        {/* Department Cards Section */}
        <section className="py-16">
          <div className="container-custom">
            <SectionTitle
              title="Our Departments"
              description="Explore our diverse range of departments, each dedicated to pushing the boundaries of scientific knowledge"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              {departments.map((dept) => (
                <DepartmentCard
                  key={dept.title}
                  image={dept.image}
                  title={dept.title}
                  description={dept.description}
                  href={dept.href}
                />
              ))}
            </div>

            <div className="text-center">
              <Button variant="secondary" href="/departments">
                View All Departments
              </Button>
            </div>
          </div>
        </section>

        {/* News Cards Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <SectionTitle
              title="Latest News & Events"
              description="Stay updated with the latest from the College of Science"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {newsItems.map((news) => (
                <NewsCard
                  key={news.title}
                  image={news.image}
                  category={news.category}
                  title={news.title}
                  date={news.date}
                  href={news.href}
                />
              ))}
            </div>

            <div className="text-center">
              <Button variant="primary" href="/news" showArrow>
                View All News
              </Button>
            </div>
          </div>
        </section>

        {/* Executive Cards Section */}
        <section className="py-16">
          <div className="container-custom">
            <SectionTitle
              title="Meet Our SCISA Executives"
              description="Dedicated student leaders committed to serving the College of Science community"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8 justify-items-center">
              {executives.map((exec) => (
                <ExecutiveCard
                  key={exec.name}
                  image={exec.image}
                  name={exec.name}
                  title={exec.title}
                />
              ))}
            </div>

            <div className="text-center">
              <Button variant="primary" href="/executives" showArrow>
                View All Executives
              </Button>

              {/* <DepartmentCard
                image={homeImg}
                title="Our Departments"
                description="Explore our diverse range of departments, each dedicated to pushing the boundaries of scientific knowledge"
                href="/departments"
              /> */}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;

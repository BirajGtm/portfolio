// @flow strict
import { personalData } from "@/utils/data/personal-data";

async function getBlog(slug) {
  const res = await fetch(`https://dev.to/api/articles/${personalData.devUsername}/${slug}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  return data;
}

export async function generateStaticParams() {
  const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const blogs = await res.json();

  return blogs.map(blog => ({
    params: { slug: blog.slug }
  }));
}

async function BlogDetails({ params }) {
  const slug = params.slug;
  const blog = await getBlog(slug);

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.description}</p>
      {/* Add more blog details here */}
    </div>
  );
}

export default BlogDetails;

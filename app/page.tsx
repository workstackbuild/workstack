// /app/page.tsx
// ✅ Next.js (App Router) compatible homepage (TypeScript-friendly, no hardcoded external deps)

"use client";

import Link from "next/link";
import Image from "next/image";
import workflowsData from "@/data/workflows.json";
import categoriesData from "@/data/categories.json";

// 🔁 TEMP DATA LAYER (replace with JSON later)
type Workflow = {
  id: string;
  title: string;
  description: string;
  tools: string[];
  difficulty: string;
  time: string;
};

type Category = { name: string };


const tools = ["ChatGPT", "Claude", "Zapier", "Notion", "Make"];

function getWorkflows(): Workflow[] {
  return workflowsData;
}

function getCategories(): Category[] {
  return categoriesData;
}

export default function HomePage() {
  const workflows = getWorkflows();
  const categories = getCategories();

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 text-black px-6 md:px-12 py-6">
      {/* Navbar */}
      <nav className="max-w-6xl mx-auto flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Workstack" width={40} height={40} />
          <span className="font-semibold text-lg">Workstack</span>
        </div>
        <div className="flex gap-6 text-sm text-gray-600">
          <a href="#categories">Categories</a>
          <a href="#workflows">Workflows</a>
          <a href="#about">About</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-semibold">
            Turn Tools into Workflows
          </h1>
          <p className="text-gray-600 max-w-md">
            Discover step-by-step AI workflows built for execution.
          </p>
          <a href="#workflows" className="inline-block px-4 py-2 bg-black text-white rounded-lg">
            Explore Workflows
          </a>
        </div>

        <div className="bg-white/40 border border-gray-200 rounded-2xl h-48 flex items-center justify-center">
          <span className="text-gray-400">Animation / GIF</span>
        </div>
      </section>

      {/* Tools Marquee */}
      <section className="mt-16 overflow-hidden">
        <div className="flex gap-6 whitespace-nowrap animate-marquee">
          {[...tools, ...tools].map((tool, i) => (
            <div key={i} className="px-4 py-2 bg-white/60 border rounded-xl text-sm">
              {tool}
            </div>
          ))}
        </div>
      </section>

      {/* Workflows */}
      <section id="workflows" className="max-w-6xl mx-auto mt-20">
        <div className="grid md:grid-cols-2 gap-6">
          {workflows.map((wf) => (
            <div
              key={wf.id}
              className="bg-gradient-to-br from-white/70 to-blue-50 border border-gray-100 rounded-2xl p-5 space-y-3 hover:shadow-md transition"
            >
              <h3 className="font-semibold">{wf.title}</h3>
              <p className="text-sm text-gray-600">{wf.description}</p>

              <div className="flex gap-2 flex-wrap">
                {wf.tools.map((tool) => (
                  <span key={tool} className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {tool}
                  </span>
                ))}
              </div>

              <div className="flex justify-between text-sm text-gray-500">
                <span>{wf.difficulty}</span>
                <span>{wf.time}</span>
              </div>

              <Link href={`/workflow/${wf.id}`} className="block">
                <button className="w-full bg-black text-white py-2 rounded-lg text-sm">
                  View Workflow
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="max-w-5xl mx-auto mt-20">
        <div className="bg-gradient-to-br from-white/60 to-green-50 border rounded-2xl p-6">
          <h3 className="mb-4 font-semibold">Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="bg-white/70 border rounded-xl p-4 text-center hover:shadow"
              >
                {cat.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-4xl mx-auto mt-16">
        <div className="bg-gradient-to-br from-white/60 to-blue-50 border rounded-2xl p-8 text-center">
          <p className="mb-4">Get new workflows weekly</p>
          <button className="bg-black text-white px-4 py-2 rounded-lg">
            Sign up
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto mt-16 grid md:grid-cols-3 gap-6 text-sm text-gray-600">
        <div>
          <p className="font-medium mb-2">Workstack</p>
          <p>Newsletter</p>
          <p>Contact</p>
        </div>
        <div>
          {categories.map((cat) => (
            <p key={cat.name}>{cat.name}</p>
          ))}
        </div>
        <div>
          <p>Privacy Policy</p>
          <p>Terms</p>
          <p>Disclaimer</p>
        </div>
      </footer>

      {/* Simple marquee animation (global style alternative recommended later) */}
      <style jsx global>{`
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </main>
  );
}

// 🔁 NEXT STEP (later):
// import workflowsData from "@/data/workflows.json";
// import categoriesData from "@/data/categories.json";

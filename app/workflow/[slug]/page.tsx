import fs from "fs";
import path from "path";

export default function WorkflowPage({ params }: { params: { slug: string } }) {
  const filePath = path.join(
    process.cwd(),
    "data",
    "workflows",
    `${params.slug}.json`
  );

  if (!fs.existsSync(filePath)) {
    return <div className="p-6">Workflow not found</div>;
  }

  const fileData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(fileData);

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Title */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
          <p className="text-gray-600">{data.description}</p>
        </div>

        {/* What you get */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">What You’ll Get</h2>
          <ul className="list-disc pl-5 space-y-2">
            {data.what_you_get?.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Tools */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Tools</h2>
          <div className="flex gap-2 flex-wrap">
            {data.tools?.map((tool: string, i: number) => (
              <span key={i} className="bg-blue-100 px-3 py-1 rounded-full text-sm">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Sections */}
        {data.sections?.map((section: any, idx: number) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
            <ul className="space-y-3">
              {section.steps.map((step: any, i: number) => (
                <li key={i} className="bg-blue-50 p-3 rounded-lg border">
                  <strong>{step.title}</strong>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Pattern Templates */}
        {data.pattern_templates && (
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4">Pattern Templates</h2>
            {data.pattern_templates.formats.map((tpl: any, i: number) => (
              <div key={i} className="mb-4">
                <p className="font-medium">{tpl.name}</p>
                <p className="text-sm text-gray-600 mb-2">{tpl.template}</p>
                <ul className="text-sm text-green-700 space-y-1">
                  {tpl.examples.map((ex: string, j: number) => (
                    <li key={j}>• {ex}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
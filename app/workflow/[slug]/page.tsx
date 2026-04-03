import workflowsData from "@/data/workflows.json";

type Workflow = {
  id: string;
  title: string;
  description: string;
  tools: string[];
  difficulty: string;
  time: string;
};

export default async function WorkflowPage({ params }: any) {
  const resolvedParams = await params;

  console.log("SLUG:", resolvedParams.slug);
  console.log("DATA:", workflowsData);

  const data = (workflowsData as any).default || workflowsData;

  const workflow = data.find((w: any) => w.id === resolvedParams.slug);

  if (!workflow) {
    return <div className="p-10">Workflow not found</div>;
  }

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">{workflow.title}</h1>
      <p className="text-gray-600 mb-6">{workflow.description}</p>

      <div className="flex gap-2 mb-4">
        {workflow.tools.map((tool: string) => (
          <span key={tool} className="bg-gray-100 px-2 py-1 rounded text-sm">
            {tool}
          </span>
        ))}
      </div>

      <div className="text-sm text-gray-500 mb-6">
        {workflow.difficulty} • {workflow.time}
      </div>

      <div className="mt-6">
  <h2 className="text-xl font-semibold mb-3">Steps</h2>
  <ol className="list-decimal pl-5 space-y-2">
    {workflow.steps?.map((step: string, index: number) => (
      <li key={index} className="text-gray-700">
        {step}
      </li>
    ))}
  </ol>
</div>
    </div>
  );
}
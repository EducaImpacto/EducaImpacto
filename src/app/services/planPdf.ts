import { jsPDF } from 'jspdf';
import { planSections, type GeneratedBusinessPlanContent } from '../screens/BusinessPlanScreen';

export function downloadPlan(plan: GeneratedBusinessPlanContent, name: string, owner: string, version: number) {
  const doc = new jsPDF();
  let y = 30;
  const page = () => { doc.addPage(); y = 25; };
  function paragraph(value: string, size = 11, bold = false) {
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.setFontSize(size);
    doc.setTextColor(5, 34, 84);
    for (const line of doc.splitTextToSize(value, 163)) {
      if (y > 272) page();
      doc.text(line, 22, y);
      y += size * 0.5;
    }
    y += 5;
  }
  paragraph('Educa Impacto', 16, true);
  y = 95;
  paragraph('Plano de negócios', 30, true);
  paragraph(name, 19);
  paragraph('Empreendedor(a): ' + owner);
  paragraph('Versão ' + version);
  const sections = planSections.map(section => ({title: section.title, body: plan[section.generatedField]}));
  const extra = plan as GeneratedBusinessPlanContent & Record<string, unknown>;
  const additional = [
    ['Cenário pessimista', 'pessimisticScenario', 'Considere vendas abaixo do previsto e estime por quanto tempo o caixa cobre os custos fixos.'],
    ['Cenário mais provável', 'baseScenario', 'Use a demanda observada, o preço médio e os custos recorrentes como base da projeção.'],
    ['Cenário otimista', 'optimisticScenario', 'Avalie a capacidade de atender ao aumento da demanda e o capital de giro necessário.'],
    ['Avaliação estratégica', 'strategicAssessment', plan.risksAndMitigations],
    ['Preparação para microcrédito', 'microcreditRecommendation', 'Antes de solicitar crédito, documente a finalidade do recurso e compare o valor das parcelas com o caixa disponível no cenário pessimista.']
  ];
  for (const [title, field, guidance] of additional) {
    sections.push({title, body: typeof extra[field] === 'string' && extra[field].trim() ? extra[field] : guidance});
  }
  if (plan.nextSteps?.length) sections.push({title:'Próximos passos', body:plan.nextSteps.join('\n')});
  page();
  paragraph('Sumário', 20, true);
  const tocPage = doc.getNumberOfPages();
  const rows = sections.map((section,i) => { const row = y; paragraph((i+1)+'. '+section.title); return row; });
  page();
  sections.forEach((section,i) => {
    if (y > 235) page();
    const number = doc.getNumberOfPages();
    doc.setPage(tocPage);
    doc.text(String(number), 183, rows[i], {align:'right'});
    doc.setPage(number);
    paragraph(section.title, 16, true);
    paragraph(section.body);
  });
  doc.save('plano-de-negocios-v'+version+'.pdf');
}

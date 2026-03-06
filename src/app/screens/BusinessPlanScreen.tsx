import React from 'react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { FileDown, Edit, Share2, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface BusinessPlanScreenProps {
  onDownload: () => void;
  onEdit: () => void;
  onShare: () => void;
  onBackToDashboard: () => void;
}

export function BusinessPlanScreen({ 
  onDownload, 
  onEdit, 
  onShare,
  onBackToDashboard 
}: BusinessPlanScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Confirmação Visual */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8"
        >
          {/* Header Celebrativo */}
          <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 px-8 py-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
            >
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Missão Completa! 🎉
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-green-100 mb-6"
            >
              Seu plano de negócios está pronto para transformar sua ideia em realidade
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center gap-3 flex-wrap"
            >
              <Badge type="trophy" label="Jornada Completa" color="green" />
              <Badge type="star" label="Empreendedor" color="orange" />
              <Badge type="zap" label="Inovador" color="blue" />
            </motion.div>
          </div>

          {/* Preview do Plano */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Seu Plano de Negócios</h2>
                <p className="text-gray-600 mb-6">
                  Um documento completo e profissional, gerado com base nas suas respostas e aprimorado pela Inteligência Artificial.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Sumário Executivo</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Análise de Mercado</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Estratégia de Marketing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Projeções Financeiras</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Plano de Ação</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl transform rotate-3 opacity-20"></div>
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1760952851538-17a59f691efe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBsYW4lMjBpbm5vdmF0aW9uJTIwZGlnaXRhbHxlbnwxfHx8fDE3NzI2NjU0NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Plano de negócios"
                    className="rounded-2xl shadow-xl relative z-10 w-full"
                  />
                </div>
              </div>
            </div>

            {/* Ações Principais */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Button variant="primary" size="lg" className="w-full" onClick={onDownload}>
                <FileDown className="w-5 h-5 mr-2 inline" />
                Baixar PDF
              </Button>

              <Button variant="outline" size="lg" className="w-full" onClick={onEdit}>
                <Edit className="w-5 h-5 mr-2 inline" />
                Editar Respostas
              </Button>

              <Button variant="outline" size="lg" className="w-full" onClick={onShare}>
                <Share2 className="w-5 h-5 mr-2 inline" />
                Compartilhar
              </Button>
            </div>

            {/* Informação Adicional */}
            <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-5">
              <p className="text-sm text-blue-900">
                <strong>💡 Dica:</strong> Use este plano como base para buscar investimentos, financiamentos ou para guiar o crescimento do seu negócio. Você pode editar as respostas a qualquer momento.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Próximos Passos */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">O que fazer agora?</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Revise seu plano</h3>
              <p className="text-sm text-gray-600">Leia com atenção e faça ajustes se necessário</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Busque recursos</h3>
              <p className="text-sm text-gray-600">Procure investidores ou programas de apoio</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Coloque em prática</h3>
              <p className="text-sm text-gray-600">Comece a executar seu plano de negócios</p>
            </div>
          </div>

          <div className="text-center">
            <Button variant="outline" size="md" onClick={onBackToDashboard}>
              Voltar ao Dashboard
            </Button>
          </div>
        </motion.div>

        {/* Mensagem Final */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-gray-600">
            Parabéns por concluir sua jornada na <strong className="text-blue-600">Educa Impacto</strong>! 
            Seu futuro empreendedor começa agora.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

import React from 'react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Trophy, Star, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ModuleCompletedScreenProps {
  moduleTitle: string;
  xpGained: number;
  badgeLabel: string;
  onNext: () => void;
}

export function ModuleCompletedScreen({ 
  moduleTitle, 
  xpGained, 
  badgeLabel, 
  onNext 
}: ModuleCompletedScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center"
        >
          {/* Ícone de Conquista */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <Trophy className="w-12 h-12 text-white" />
          </motion.div>

          {/* Título */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Módulo Concluído! 🎉
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mb-8"
          >
            {moduleTitle}
          </motion.p>

          {/* XP Ganho */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="bg-gradient-to-r from-orange-100 to-yellow-100 border-2 border-orange-300 rounded-2xl p-6 mb-6"
          >
            <div className="flex items-center justify-center gap-3">
              <Star className="w-8 h-8 text-orange-600" />
              <div className="text-left">
                <div className="text-sm text-orange-700 font-medium">XP Ganho</div>
                <div className="text-3xl font-bold text-orange-600">+{xpGained} XP</div>
              </div>
            </div>
          </motion.div>

          {/* Nova Insígnia */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <p className="text-sm font-medium text-gray-600 mb-3">Nova Insígnia Desbloqueada</p>
            <div className="flex justify-center">
              <Badge type="trophy" label={badgeLabel} color="green" />
            </div>
          </motion.div>

          {/* Botão para Próximo Módulo */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Button variant="primary" size="lg" className="w-full" onClick={onNext}>
              Próximo Módulo
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Button>
          </motion.div>

          {/* Mensagem Motivacional */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-sm text-gray-500"
          >
            Continue assim! Você está mais perto do seu plano de negócios.
          </motion.p>
        </motion.div>

        {/* Animação de Confete */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex justify-center gap-3"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-sm"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

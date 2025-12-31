import React, { useState } from 'react';

const StepWizard = ({ currentStep }) => {
  const steps = ['入力', '確認', '完了'];

  return (
    <div className="relative flex justify-between w-full max-w-md mx-auto">
      {/* 背景の線 */}
      <div className="absolute top-1/2 w-full h-1 bg-slate-200 -z-10 -translate-y-1/2" />
      {/* 進捗バー */}
      <div
        className="absolute top-1/2 h-1 bg-blue-600 -z-10 -translate-y-1/2 transition-all duration-300"
        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
      />

      {steps.map((label, idx) => {
        const stepNum = idx + 1;
        const isActive = stepNum <= currentStep;
        return (
          <div key={label} className="bg-white px-2 flex flex-col items-center gap-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors
              ${isActive ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300 text-slate-400'}`}
            >
              {stepNum}
            </div>
            <span className={`text-xs ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// ステップコンテンツ
const StepContent = ({ step, onNext, onBack }) => {
  const contents = {
    1: {
      title: 'ステップ1: 基本情報の入力',
      description: 'まずはあなたの基本情報を入力してください。',
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">お名前</label>
            <input
              type="text"
              placeholder="山田太郎"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">メールアドレス</label>
            <input
              type="email"
              placeholder="example@example.com"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      ),
    },
    2: {
      title: 'ステップ2: 入力内容の確認',
      description: '入力した内容に間違いがないか確認してください。',
      content: (
        <div className="bg-slate-50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-600">お名前:</span>
            <span className="font-medium">山田太郎</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">メールアドレス:</span>
            <span className="font-medium">example@example.com</span>
          </div>
        </div>
      ),
    },
    3: {
      title: 'ステップ3: 登録完了',
      description: '登録が完了しました。ありがとうございます！',
      content: (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-slate-600">登録完了メールを送信しました。</p>
        </div>
      ),
    },
  };

  const current = contents[step];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">{current.title}</h2>
        <p className="text-slate-600">{current.description}</p>
      </div>

      {current.content}

      <div className="flex justify-between pt-4">
        {step > 1 && step < 3 && (
          <button
            onClick={onBack}
            className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            ← 戻る
          </button>
        )}
        {step < 3 && (
          <button
            onClick={onNext}
            className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {step === 2 ? '登録する' : '次へ →'}
          </button>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">ステップウィザード デモ</h1>
          <p className="text-slate-600 mb-4">
            複数段階の処理で全体像と現在地を可視化
          </p>
          {currentStep === 3 && (
            <button
              onClick={handleReset}
              className="text-blue-600 hover:underline text-sm"
            >
              最初からやり直す
            </button>
          )}
        </div>

        <StepWizard currentStep={currentStep} />

        <StepContent step={currentStep} onNext={handleNext} onBack={handleBack} />

        
    </div>
  );
}

// src/App.jsx

import { useState, useMemo } from 'react';

const textData = {
  pt: {
    title: 'Calculadora de IMC',
    weightLabel: 'Peso',
    heightLabel: 'Altura',
    calculateButton: 'Calcular',
    metric: 'Métrico',
    imperial: 'Imperial',
    language: 'Idioma',
    resultTitle: 'Seu Resultado:',
    bmi: 'Seu IMC é',
    status: 'Classificação',
    statuses: {
      underweight: 'Abaixo do peso',
      normal: 'Peso normal',
      overweight: 'Sobrepeso',
      obese: 'Obesidade',
    },
    error: 'Por favor, insira valores válidos.',
  },
  en: {
    title: 'BMI Calculator',
    weightLabel: 'Weight',
    heightLabel: 'Height',
    calculateButton: 'Calculate',
    metric: 'Metric',
    imperial: 'Imperial',
    language: 'Language',
    resultTitle: 'Your Result:',
    bmi: 'Your BMI is',
    status: 'Classification',
    statuses: {
      underweight: 'Underweight',
      normal: 'Normal weight',
      overweight: 'Overweight',
      obese: 'Obese',
    },
    error: 'Please enter valid values.',
  },
};

function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState('metric');
  const [language, setLanguage] = useState('pt');
  const [bmiResult, setBmiResult] = useState(null);
  const [error, setError] = useState('');

  const texts = useMemo(() => textData[language], [language]);

  const getBmiStatus = (bmi) => {
    if (bmi < 18.5) return { text: texts.statuses.underweight, color: 'text-sky-400' };
    if (bmi < 24.9) return { text: texts.statuses.normal, color: 'text-green-400' };
    if (bmi < 29.9) return { text: texts.statuses.overweight, color: 'text-yellow-400' };
    return { text: texts.statuses.obese, color: 'text-red-400' };
  };

  const handleCalculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      setError(texts.error);
      setBmiResult(null);
      return;
    }

    setError('');
    let bmi;

    if (unit === 'metric') {
      const heightInMeters = h / 100;
      bmi = w / (heightInMeters * heightInMeters);
    } else {
      bmi = 703 * (w / (h * h));
    }
    
    const status = getBmiStatus(bmi);
    setBmiResult({ value: bmi.toFixed(2), status });
  };

  const weightUnit = unit === 'metric' ? '(kg)' : '(lbs)';
  const heightUnit = unit === 'metric' ? '(cm)' : '(in)';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 font-sans">
      {/* Card principal com efeito de vidro fosco */}
      <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-2xl p-8">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-100 tracking-wider">{texts.title}</h1>
          <div className="flex items-center space-x-2">
            <button onClick={() => setLanguage('pt')} className={`px-3 py-1 text-sm rounded-md transition-colors ${language === 'pt' ? 'bg-sky-500 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}>PT</button>
            <button onClick={() => setLanguage('en')} className={`px-3 py-1 text-sm rounded-md transition-colors ${language === 'en' ? 'bg-sky-500 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}>EN</button>
          </div>
        </div>

        <div className="flex justify-center items-center bg-slate-900/50 rounded-lg p-1 mb-8">
          <button onClick={() => setUnit('metric')} className={`w-1/2 py-2 rounded-md transition-colors font-medium ${unit === 'metric' ? 'bg-sky-500/80' : 'hover:bg-slate-700/50'}`}>
            {texts.metric}
          </button>
          <button onClick={() => setUnit('imperial')} className={`w-1/2 py-2 rounded-md transition-colors font-medium ${unit === 'imperial' ? 'bg-sky-500/80' : 'hover:bg-slate-700/50'}`}>
            {texts.imperial}
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-slate-400 mb-2 font-medium">{`${texts.weightLabel} ${weightUnit}`}</label>
            <input 
              type="number"
              placeholder='Ex: 70'
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-2 font-medium">{`${texts.heightLabel} ${heightUnit}`}</label>
            <input 
              type="number"
              placeholder='Ex: 175'
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
            />
          </div>
        </div>
        
        <button
          onClick={handleCalculate}
          className="w-full mt-8 bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 rounded-lg text-lg transform hover:scale-105 transition-all duration-300"
        >
          {texts.calculateButton}
        </button>

        {error && <p className="text-red-400 text-center mt-6">{error}</p>}

        {bmiResult && (
          <div className="mt-8 p-6 bg-slate-900/50 border border-slate-700 rounded-lg text-center">
            <h2 className="text-lg font-semibold text-slate-300 mb-2">{texts.resultTitle}</h2>
            <p className="text-5xl font-bold text-sky-400 mb-3">{bmiResult.value}</p>
            <p className="text-xl">
              {texts.status}: <span className={`font-semibold ${bmiResult.status.color}`}>{bmiResult.status.text}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

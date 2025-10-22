// src/App.jsx

import { useState, useMemo } from 'react';

// Paleta de cores (definida no index.html):
// 'theme-light-green': '#C8D197'
// 'theme-gold': '#D89845'
// 'theme-orange': '#C54B2C'
// 'theme-dark': '#473430'
// 'theme-teal': '#11BAAC'

const textData = {
  pt: {
    title: 'Calculadora de IMC',
    weightLabel: 'Peso',
    heightLabel: 'Altura',
    calculateButton: 'Calcular',
    metric: 'Métrico',
    imperial: 'Imperial',
    language: 'Idioma',
    resultTitle: 'Seu Resultado',
    bmi: 'Seu IMC é',
    status: 'Classificação',
    statuses: {
      underweight: 'Abaixo do peso',
      normal: 'Peso normal',
      overweight: 'Sobrepeso',
      obese: 'Obesidade',
    },
    error: 'Por favor, insira valores válidos.',
    modalIdeal: 'O IMC ideal está na faixa de',
    modalWarning: 'Como seu resultado está fora da faixa ideal, recomendamos procurar um profissional de saúde para maiores esclarecimentos.',
    modalSuccess: 'Seu resultado está na faixa ideal. Parabéns!',
    modalBase: 'Lembre-se que o IMC é apenas uma estimativa.',
    okButton: 'OK, Entendi'
  },
  en: {
    title: 'BMI Calculator',
    weightLabel: 'Weight',
    heightLabel: 'Height',
    calculateButton: 'Calculate',
    metric: 'Metric',
    imperial: 'Imperial',
    language: 'Language',
    resultTitle: 'Your Result',
    bmi: 'Your BMI is',
    status: 'Classification',
    statuses: {
      underweight: 'Underweight',
      normal: 'Normal weight',
      overweight: 'Overweight',
      obese: 'Obese',
    },
    error: 'Please enter valid values.',
    modalIdeal: 'The ideal BMI is in the range of',
    modalWarning: 'As your result is outside the ideal range, we recommend consulting a health professional for further clarification.',
    modalSuccess: 'Your result is in the ideal range. Congratulations!',
    modalBase: 'Remember that BMI is only an estimate.',
    okButton: 'OK, Got it'
  },
};

function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState('metric');
  const [language, setLanguage] = useState('pt');
  const [bmiResult, setBmiResult] = useState(null);
  const [error, setError] = useState('');
  
  // NOVO ESTADO para controlar o modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const texts = useMemo(() => textData[language], [language]);

  const getBmiStatus = (bmi) => {
    if (bmi < 18.5) return { text: texts.statuses.underweight, color: 'text-theme-gold' };
    if (bmi < 24.9) return { text: texts.statuses.normal, color: 'text-theme-light-green' };
    if (bmi < 29.9) return { text: texts.statuses.overweight, color: 'text-theme-gold' };
    return { text: texts.statuses.obese, color: 'text-theme-orange' };
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
    
    // MUDANÇA AQUI: Abrir o modal em vez de mostrar o resultado no card
    setIsModalOpen(true);
  };

  // NOVA FUNÇÃO para fechar o modal e resetar tudo
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setWeight('');
    setHeight('');
    setBmiResult(null);
    setError('');
  };

  const weightUnit = unit === 'metric' ? '(kg)' : '(lbs)';
  const heightUnit = unit === 'metric' ? '(cm)' : '(in)';

  return (
    // Div principal. O `relative` é importante para o modal
    <div className="min-h-screen bg-theme-dark text-white flex flex-col items-center justify-center p-4 font-sans relative">
      
      <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-2xl p-8">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-theme-teal tracking-wider">{texts.title}</h1>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setLanguage('pt')} 
              className={`px-3 py-1 text-sm rounded-md transition-colors font-medium border ${
                language === 'pt' 
                ? 'bg-theme-teal text-white border-theme-teal' 
                : 'bg-transparent text-theme-teal border-theme-teal/50 hover:bg-theme-teal/20'
              }`}
            >
              PT
            </button>
            <button 
              onClick={() => setLanguage('en')} 
              className={`px-3 py-1 text-sm rounded-md transition-colors font-medium border ${
                language === 'en' 
                ? 'bg-theme-teal text-white border-theme-teal' 
                : 'bg-transparent text-theme-teal border-theme-teal/50 hover:bg-theme-teal/20'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center rounded-lg p-1 mb-8 space-x-2">
          <button 
            onClick={() => setUnit('metric')} 
            className={`w-1/2 py-2 rounded-md transition-colors font-medium border ${
              unit === 'metric' 
              ? 'bg-theme-gold text-theme-dark border-theme-gold' 
              : 'bg-transparent text-theme-gold border-theme-gold/50 hover:bg-theme-gold/20'
            }`}
          >
            {texts.metric}
          </button>
          <button 
            onClick={() => setUnit('imperial')} 
            className={`w-1/2 py-2 rounded-md transition-colors font-medium border ${
              unit === 'imperial' 
              ? 'bg-theme-gold text-theme-dark border-theme-gold' 
              : 'bg-transparent text-theme-gold border-theme-gold/50 hover:bg-theme-gold/20'
            }`}
          >
            {texts.imperial}
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-theme-light-green mb-2 font-medium">{`${texts.weightLabel} ${weightUnit}`}</label>
            <input 
              type="number"
              placeholder='Ex: 70'
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-theme-teal transition-all text-white"
            />
          </div>
          <div>
            <label className="block text-theme-light-green mb-2 font-medium">{`${texts.heightLabel} ${heightUnit}`}</label>
            <input 
              type="number"
              placeholder='Ex: 175'
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-theme-teal transition-all text-white"
            />
          </div>
        </div>
        
        <button
          onClick={handleCalculate}
          className="w-full mt-8 bg-theme-teal hover:bg-theme-teal/80 text-white font-bold py-3 rounded-lg text-lg transform hover:scale-105 transition-all duration-300"
        >
          {texts.calculateButton}
        </button>

        {/* Mensagem de erro (ainda aparece no card) */}
        {error && <p className="text-red-400 text-center mt-6">{error}</p>}

        {/* MUDANÇA AQUI:
          O bloco de resultado do IMC foi REMOVIDO daqui.
          Ele agora existe apenas dentro do modal.
        */}
      </div>

      {/* NOVO BLOCO: O MODAL DE AVISO 
        Renderizado condicionalmente com base no 'isModalOpen'
      */}
      {isModalOpen && bmiResult && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-10">
          
          {/* Card do Modal */}
          <div className="w-full max-w-sm bg-gray-900 rounded-xl shadow-2xl p-6 text-center border border-gray-700">
            
            <h3 className="text-2xl font-bold text-theme-teal mb-4">{texts.resultTitle}</h3>
            
            {/* O Resultado */}
            <p className="text-gray-300 text-lg">{texts.bmi}:</p>
            <p className="text-6xl font-bold text-theme-teal my-2">{bmiResult.value}</p>
            <p className="text-xl mb-6">
              {texts.status}: <span className={`font-semibold ${bmiResult.status.color}`}>{bmiResult.status.text}</span>
            </p>

            {/* Linha Divisória */}
            <hr className="border-gray-700 mb-6" />

            {/* Mensagem Genérica */}
            <p className="text-sm text-gray-400 mb-4">
              {texts.modalIdeal} <strong>18.5</strong> a <strong>24.9</strong>.
            </p>
            <p className="text-sm text-gray-300 mb-6">
              {texts.modalBase}
              
              {/* Mensagem Condicional de Saúde */}
              {(parseFloat(bmiResult.value) < 18.5 || parseFloat(bmiResult.value) >= 25) ? (
                <span className="text-theme-gold font-semibold block mt-2">
                  {texts.modalWarning}
                </span>
              ) : (
                <span className="text-theme-light-green font-semibold block mt-2">
                  {texts.modalSuccess}
                </span>
              )}
            </p>

            {/* Botão de Fechar e Resetar */}
            <button
              onClick={handleCloseModal}
              className="w-full bg-theme-teal hover:bg-theme-teal/80 text-white font-bold py-3 rounded-lg text-lg transition-colors"
            >
              {texts.okButton}
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default App;
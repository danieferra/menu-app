import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Waiting.module.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Waiting() {
    const location = useLocation();
    const pedidoNumero = location.state?.pedidoNumero;

    const [pedidoStatus, setPedidoStatus] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentIconIndex, setCurrentIconIndex] = useState(0);
    const [error, setError] = useState(null);
    const [frases, setFrases] = useState([
        'Quem espera sempre alcança.',
        'Vigia irmão, o pedido vem como ladrão.',
        'Sê forte e corajoso, espera no Senhor.',
        'Tudo tem o seu tempo determinado, incluindo o teu pedido.',
        'O amor é paciente, ama-nos por favor.',
        'Sejam também pacientes e fortaleçam o seu coração, pois a vinda está próxima.',
        'E foi assim que, depois de esperar pacientemente, Abraão alcançou a promessa.',
        'O Senhor não deixa o justo passar fome, mas frustra a ambição dos ímpios.',
        'Os leões podem passar necessidade e fome, mas os que buscam o Senhor de nada têm falta.',
        'A fome continuava rigorosa na terra. - Génesis 43:1',
        'Bem-aventurados vocês que agora têm fome, pois serão satisfeitos.',
        'A nossa pele arde como um forno, com o calor da fome que nos consome. - Lamentações 5:10',
        'O teu pedido ficará pronto assim que a equipa acabar de discutir na cozinha.',
        'Jesus aguentou 40 dias e 40 noites, aguentas mais 5 minutos?',
        'A multiplicar os pães.',
        'Nem o Êxodo demorou tanto tempo.',
        'Um corvo irá aparecer com o teu pedido.',
        'Todos os pedidos cooperam para que o teu seja o último.',
        'Buscai primeiro o Reino, depois o teu pedido.',
        'Sabias que 50% de salsicha é sal? O resto é sicha',
        'Será que ainda não está feito, ou esqueceram-se?',
        'Estou quase como Paulo: já sei o que é passar fome, só não sei a fartura',
        'Isto parece o Egito, de tão rigorosa que está a fome',
        'Quem está satisfeito despreza o mel, mas para quem tem fome até o amargo é doce - Provérbios 27:7',
        'Estava à espera do meu pedido, maná’pareceu',
        'Se me juntar a mais 6, aposto que somos iguais às 7 vacas feias e magras do sonho do Faraó',
        'Será que os 7 anos de fome no Egito recomeçaram hoje?',
        'Bem-aventurados vocês que agora têm fome, pois serão satisfeitos. Lucas 6:21',
        'Alguém tem por aí 5 pães e 2 peixinhos?',
        'Os que foram mortos à espada estão melhor do que os que morreram de fome - Lamentações 4:9',
        'Até Paulo tinha comida na prisão',
        'Até Noé construiu a arca mais rápido',
        'Agora entendo que um dia pode ser como mil anos',
        'Esperei confiantemente no Senhor, e o meu pedido chegou'

    ]);
    const [icons, setIcons] = useState([
        "https://cdn.lordicon.com/ozzqxurw.json",
        "https://cdn.lordicon.com/bchxwwag.json",
        "https://cdn.lordicon.com/zniduxor.json",
        "https://cdn.lordicon.com/mhddipcx.json",
        "https://cdn.lordicon.com/fmclztgv.json",
        "https://cdn.lordicon.com/qphbplvq.json",
        "https://cdn.lordicon.com/fmdfxhbt.json",
        "https://cdn.lordicon.com/qvyppzqz.json"
    ]);

    // Function to shuffle an array
    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // swap elements
        }
        return array;
    };

    useEffect(() => {
        // Shuffle phrases and icons initially
        setFrases(shuffle([...frases]));
        setIcons(shuffle([...icons]));

        const fetchStatus = async () => {
            try {
                const response = await fetch(`${API_URL}/pedidos/status/${pedidoNumero}`);
                console.log(`${API_URL}/pedidos/status/${pedidoNumero}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch status');
                }
                const data = await response.json();
                setPedidoStatus(data.estado);

                // Only update phrases and icons if pedidoStatus is false
                if (!data.estado) {
                    setCurrentIndex(prevIndex => {
                        // Increment or reset index
                        return (prevIndex + 1) % frases.length;
                    });
                    setCurrentIconIndex(prevIndex => {
                        // Increment or reset index
                        return (prevIndex + 1) % icons.length;
                    });
                }
            } catch (error) {
                setError(error.message);
            }
        };

        if (pedidoNumero) {
            fetchStatus();
            const interval = setInterval(fetchStatus, 10000);
            return () => clearInterval(interval);
        }
    }, [pedidoNumero, frases.length, icons.length]); // Depend on frases.length and icons.length to trigger re-setup after shuffling

    if (error) return <div>Error: {error}</div>;

    return (
        <div className={styles.animatedGradient}>
            <div className='text-center p-5'>
                {pedidoStatus ? (
                    <>
                    <h1 className='fw-bold'>Nº {pedidoNumero}</h1>
                    <h2 className='fw-bold'>A TRIBULAÇÃO TERMINOU!</h2>
                    <p style={{fontSize:'large'}}>Já podes ir buscar o teu pedido.</p>
                    </>
                ) : (
                    <>
                    <lord-icon
                    src={icons[currentIconIndex]}
                    trigger="loop"
                    delay="1500"
                    style={{ width: "100px", height: "100px" }}
                    ></lord-icon>
                    <p style={{fontSize:'large'}}><strong style={{fontSize:'x-large'}}>A fazer</strong><br/>{frases[currentIndex]}</p>
                    </>
                )}
            </div>
        </div>
    );
}

export default Waiting;

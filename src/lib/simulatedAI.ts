export interface AIResponse {
  text: string;
}

const responses: Record<string, string[]> = {
  ai: [
    "Artificial intelligence refers to the simulation of human intelligence in machines programmed to think and learn. Modern AI systems use deep learning — neural networks with many layers — to recognize patterns in massive datasets. Today, AI powers everything from recommendation systems to autonomous vehicles and large language models like myself.",
    "The field of artificial intelligence has undergone a renaissance in the past decade, driven by exponential growth in computational power and data availability. Transformer architectures, introduced in 2017, revolutionized how machines process sequential data, enabling breakthroughs in language, vision, and reasoning tasks.",
  ],
  "machine learning": [
    "Machine learning is a subset of AI that enables systems to learn and improve from experience without being explicitly programmed. Through exposure to training data, ML models discover patterns, make decisions, and continuously refine their accuracy. Techniques like gradient descent and backpropagation form the mathematical backbone of modern learning algorithms.",
  ],
  neural: [
    "Neural networks are computational models inspired by the structure of the human brain, consisting of interconnected layers of artificial neurons. Deep neural networks with hundreds of layers can learn hierarchical representations — from simple edges in images to complex semantic concepts. The transformer architecture, featuring self-attention mechanisms, has become the dominant paradigm for state-of-the-art models.",
    "The architecture of modern neural networks draws inspiration from biological synaptic connections. Convolutional networks excel at spatial pattern recognition, recurrent networks process temporal sequences, and attention-based transformers capture long-range dependencies across entire contexts — enabling unprecedented language understanding.",
  ],
  python: [
    "Python has become the lingua franca of artificial intelligence and data science due to its elegant syntax and powerful ecosystem. Libraries like PyTorch, TensorFlow, and JAX provide GPU-accelerated tensor computation, while scikit-learn, pandas, and NumPy form the foundation for data manipulation and classical ML. Python's expressiveness enables researchers to prototype cutting-edge ideas in hours rather than days.",
  ],
  code: [
    "Writing efficient code for AI systems requires a deep understanding of both algorithmic complexity and hardware architecture. Vectorized operations, memory access patterns, and computational graph optimization are critical for training large models. Modern ML frameworks like PyTorch use dynamic computation graphs that make debugging intuitive while still compiling to highly optimized GPU kernels.",
  ],
  future: [
    "The future of AI points toward systems with genuine reasoning capabilities, multimodal understanding, and real-time adaptation. We anticipate the emergence of autonomous AI agents that can plan, code, and execute multi-step tasks across domains. Artificial General Intelligence, while still theoretical, represents the horizon toward which current research trajectories converge.",
    "By 2030, AI systems are projected to surpass human-level performance across nearly every cognitive benchmark. Neuromorphic computing, quantum-accelerated training, and self-improving architectures will reshape how intelligence is created and deployed. The convergence of robotics, AI, and biotechnology will blur the boundaries between digital and physical intelligence.",
  ],
  "what is": [
    "That's a profound question that touches on the nature of knowledge and computation. At its core, intelligence — whether artificial or biological — emerges from the ability to perceive, reason, learn, and act in complex environments. AI systems achieve this through statistical learning over vast datasets, developing internal representations that mirror the structure of reality.",
  ],
  explain: [
    "To explain complex phenomena, AI systems employ a combination of symbolic reasoning and pattern recognition. Modern explainable AI (XAI) techniques like LIME, SHAP, and attention visualization help illuminate the decision-making process of otherwise opaque neural networks. Interpretability is increasingly critical as AI systems are deployed in high-stakes domains like healthcare and law.",
  ],
  quantum: [
    "Quantum computing leverages the principles of superposition and entanglement to perform computations exponentially faster than classical computers for specific problem types. For AI, quantum algorithms could dramatically accelerate optimization, sampling, and linear algebra operations that form the backbone of machine learning. Companies like IBM, Google, and IonQ are racing toward quantum advantage in practical AI workloads.",
  ],
  robotics: [
    "Modern robotics represents the physical embodiment of AI — translating digital intelligence into real-world action. Advances in reinforcement learning, sim-to-real transfer, and tactile sensing have enabled robots to perform delicate manipulation tasks that were previously intractable. Humanoid robots like Boston Dynamics' Atlas and Tesla's Optimus represent the cutting edge of physical AI.",
  ],
  data: [
    "Data science sits at the intersection of statistics, programming, and domain expertise, forming the empirical foundation of the AI revolution. Feature engineering, dimensionality reduction, and distribution analysis are crucial for coaxing signal from noisy real-world datasets. The shift toward self-supervised learning has reduced dependence on labeled data, enabling models to learn from the vast unlabeled corpus of human knowledge.",
  ],
  nlp: [
    "Natural language processing has been transformed by the rise of large language models trained on internet-scale text corpora. Modern NLP systems achieve human-level performance on reading comprehension, translation, summarization, and dialogue tasks. The emergent capabilities of LLMs — including in-context learning and chain-of-thought reasoning — were largely unexpected and represent a fundamental shift in our understanding of language and cognition.",
  ],
  vision: [
    "Computer vision systems now routinely exceed human performance on image classification, object detection, and medical image analysis benchmarks. Convolutional neural networks first achieved this breakthrough in 2012, and vision transformers have since pushed the frontier further. Generative models like diffusion networks can now synthesize photorealistic images, videos, and 3D scenes from natural language descriptions.",
  ],
  ethics: [
    "The ethical dimensions of AI encompass fairness, accountability, transparency, and the societal distribution of AI's benefits and harms. Algorithmic bias — the amplification of historical inequities in training data — poses significant risks in high-stakes applications. Robust AI governance frameworks, including the EU AI Act and emerging international standards, are attempting to establish principled boundaries around AI development and deployment.",
  ],
  space: [
    "Space exploration increasingly relies on artificial intelligence for autonomous navigation, scientific discovery, and mission planning. NASA's Perseverance rover uses AI for terrain analysis and sample selection on Mars, while machine learning algorithms sift through terabytes of telescope data to discover exoplanets and gravitational waves. Future deep space missions will require AI systems capable of making critical decisions autonomously, beyond the reach of real-time human control.",
  ],
  blockchain: [
    "Blockchain technology provides a decentralized, immutable ledger that enables trustless transactions and verifiable computation. The convergence of AI and blockchain opens possibilities for federated learning with cryptographic privacy guarantees, verifiable AI outputs, and decentralized model governance. Smart contracts powered by on-chain AI inference are beginning to automate complex multi-party agreements with unprecedented transparency.",
  ],
  cloud: [
    "Cloud computing has democratized access to the massive computational resources required for training and deploying AI models. Services like AWS SageMaker, Google Vertex AI, and Azure ML provide managed infrastructure for the entire ML lifecycle — from data preparation to model serving at global scale. The shift toward serverless AI inference is enabling millisecond-latency predictions without the operational burden of managing infrastructure.",
  ],
  cybersecurity: [
    "Cybersecurity and AI have entered a co-evolutionary arms race, with AI systems being deployed both to defend systems and to launch increasingly sophisticated attacks. Large language models can generate convincing phishing content and discover novel code vulnerabilities, while defender AI systems monitor network traffic, detect anomalies, and automate incident response. Zero-trust architectures augmented by behavioral AI represent the emerging standard for enterprise security.",
  ],
  creativity: [
    "The intersection of AI and creativity challenges longstanding assumptions about the uniqueness of human imagination. Generative models trained on billions of artworks, musical compositions, and literary texts can produce outputs that are aesthetically compelling and stylistically coherent. While current AI creativity is fundamentally recombinative rather than truly generative, the results are reshaping industries from graphic design to music production and creative writing.",
  ],
};

const generalPool: string[] = [
  "Intelligence — whether natural or artificial — emerges from the complex interplay of memory, attention, and goal-directed reasoning. The most remarkable property of modern AI systems is their ability to generalize: applying patterns learned in one domain to solve novel problems in entirely different contexts.",
  "The exponential growth of AI capabilities follows a trajectory that few anticipated even a decade ago. Foundation models trained on internet-scale data have demonstrated emergent capabilities — abilities that arise spontaneously from scale rather than explicit design — suggesting that intelligence may be more substrate-independent than previously believed.",
  "Multimodal AI systems that simultaneously process text, images, audio, and structured data represent the next frontier of human-computer interaction. These systems can engage in rich, contextually-aware conversations that seamlessly blend information from diverse sensory modalities — approaching the integrated perception that characterizes biological intelligence.",
  "Reinforcement learning from human feedback (RLHF) has proven to be a remarkably effective technique for aligning AI behavior with human values and preferences. By iteratively refining model outputs based on human evaluations, RLHF enables the development of AI assistants that are helpful, harmless, and honest — the three pillars of responsible AI deployment.",
  "The computational complexity of modern AI systems raises profound questions about sustainability and resource allocation. Training a large language model can consume as much energy as hundreds of transatlantic flights. The field is actively pursuing more efficient architectures, sparse models, and neuromorphic hardware to dramatically reduce the carbon footprint of intelligence.",
];

function matchKeyword(message: string): string | null {
  const lower = message.toLowerCase();
  const keywordPriority = [
    "machine learning", "nlp", "what is", "cybersecurity",
    "quantum", "robotics", "blockchain", "cloud", "ethics",
    "creativity", "space", "vision", "neural", "python",
    "code", "future", "explain", "data", "ai",
  ];
  for (const keyword of keywordPriority) {
    if (lower.includes(keyword)) {
      const pool = responses[keyword];
      if (pool) {
        return pool[Math.floor(Math.random() * pool.length)];
      }
    }
  }
  return null;
}

export function getSimulatedResponse(message: string): string {
  const matched = matchKeyword(message);
  if (matched) return matched;
  return generalPool[Math.floor(Math.random() * generalPool.length)];
}

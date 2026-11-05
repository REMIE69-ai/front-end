import React, { useState } from "react";
import "./ChildAcademy.css";

type AgeBand = "2-5" | "6-8" | "9-12";

type Lesson = {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  icon: string;
  explanation: string;
  example: string;
  tip: string;
  question: string;
  options: string[];
  answer: number;
  // Interactive image comparison challenge for deepfake/real detection
  challengeType?: "quiz" | "image-spotter";
  challengeImages?: {
    realUrl: string;
    fakeUrl: string;
    realCaption: string;
    fakeCaption: string;
    questionText: string;
    options: string[];
    answer: number;
  };
};

const lessons: Lesson[] = [
  {
    id: 1,
    title: "Meet AI",
    subtitle: "Discover how computers create things",
    duration: "2 min",
    icon: "🤖",
    explanation: "Artificial Intelligence (AI) is technology that helps computers solve problems and generate new media like pictures, stories, and voices.",
    example: "Imagine asking a computer to draw a purple elephant flying over Mbarara. It can paint that picture even though that exact moment never happened.",
    tip: "An image or video can look completely real even when it was entirely built by a computer.",
    question: "Can AI create a picture of something that has never existed in real life?",
    options: ["Yes, it can", "No, never", "Only at night"],
    answer: 0,
  },
  {
    id: 2,
    title: "Picture Detectives",
    subtitle: "Learn that pictures online can be changed or created",
    duration: "3 min",
    icon: "🔎",
    explanation: "Some pictures are genuine photographs captured by a camera. Others are digitally edited or created entirely by AI. A realistic picture is not proof an event happened.",
    example: "Examine lighting consistency, object reflections, and smooth edges to spot synthetic images.",
    tip: "Always check who posted an image, where it came from, and if trusted sources show the same thing.",
    question: "Is every picture you see online guaranteed to be a real photograph?",
    options: ["Yes, every picture", "No, some are made or changed", "Only pictures of animals"],
    answer: 1,
    challengeType: "image-spotter",
    challengeImages: {
      realUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=640&auto=format&fit=crop",
      fakeUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=640&auto=format&fit=crop",
      realCaption: "Photo A: Natural fur texture, realistic shadows, and authentic lighting.",
      fakeCaption: "Photo B: Overly smooth rendering with idealized, uniform studio lighting.",
      questionText: "Detective Challenge: Based on the visual details and textures, which image is the authentic photograph?",
      options: ["Photo A (Real Photograph)", "Photo B (AI-Generated Image)", "Both are AI-generated"],
      answer: 0,
    },
  },
  {
    id: 3,
    title: "Video Magic (Deepfakes)",
    subtitle: "Understand that videos can be manipulated",
    duration: "3 min",
    icon: "🎬",
    explanation: "AI can alter video footage to make it look as if someone said or did something they never actually did. This is known as a deepfake.",
    example: "A video might show a familiar public figure saying something bizarre. Never assume it is true just because you can see and hear it.",
    tip: "Pause before sharing. Ask a trusted adult or check official news sources to verify.",
    question: "What should you do if a video of someone looks suspicious or unusual?",
    options: ["Share it quickly with everyone", "Believe it immediately", "Ask a trusted adult to help verify it"],
    answer: 2,
  },
  {
    id: 4,
    title: "Voice Detectives",
    subtitle: "Learn that a voice can be cloned",
    duration: "2 min",
    icon: "🎧",
    explanation: "Advanced AI tools can clone a person's voice using just a few seconds of audio. A voice call or voice note can sound convincing yet be fake.",
    example: "If a phone call sounds like a family member asking for urgent money or passwords, hang up and call them back on a known number.",
    tip: "Never send money, passwords, or personal details just because a voice sounds familiar.",
    question: "A voice message sounds like your relative asking for money urgently. What is the safest action?",
    options: ["Send the money right away", "Call them or a trusted adult back directly to confirm", "Share the message publicly online"],
    answer: 1,
  },
  {
    id: 5,
    title: "Truth or Trick",
    subtitle: "Check the story behind a picture or message",
    duration: "3 min",
    icon: "📰",
    explanation: "A genuine photograph can easily be shared with a false caption, an incorrect date, or a fake location to mislead people.",
    example: "A peaceful photo taken in another country years ago might be posted online today as breaking news in your town.",
    tip: "Look for the original posting date, location context, and confirmation from a second reliable source.",
    question: "Can a real photograph be used alongside a false caption to tell a misleading story?",
    options: ["Yes", "No, never", "Only if it is blurry"],
    answer: 0,
    challengeType: "image-spotter",
    challengeImages: {
      realUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=640&auto=format&fit=crop",
      fakeUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=640&auto=format&fit=crop",
      realCaption: "Mountain landscape photo taken during an outdoor excursion.",
      fakeCaption: "Abstract digital art piece created using synthetic rendering.",
      questionText: "Detective Quiz: Which picture shows a real nature photograph rather than a computer-generated illustration?",
      options: ["The abstract digital art", "The mountain landscape photograph", "Neither is real"],
      answer: 1,
    },
  },
  {
    id: 6,
    title: "Super Safety Hero",
    subtitle: "Make safe choices online",
    duration: "2 min",
    icon: "🛡️",
    explanation: "You do not have to solve tricky online mysteries alone. It is smart to pause, avoid forwarding suspicious content, and ask for guidance.",
    example: "If a picture, video, or message makes you feel uncomfortable, close the app and talk to a parent or teacher.",
    tip: "Stop. Check. Ask a trusted adult. Protect your digital space!",
    question: "What should you do if something online makes you feel uneasy or confused?",
    options: ["Keep it a complete secret", "Tell a trusted adult or teacher", "Forward it to all your friends"],
    answer: 1,
  },
];

const media = {
  realPhoto: {
    title: "Authentic Photograph",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900&auto=format&fit=crop",
    source: "https://unsplash.com",
    note: "A real landscape photograph showing natural light, consistent shadows, and organic textures.",
  },
  aiImage: {
    title: "AI-Generated Example",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Flickr_-_reiss_the_photographer_-_AI-generated_portrait_%281%29.jpg",
    source: "https://commons.wikimedia.org",
    note: "A documented synthetic portrait from Wikimedia Commons. Notice subtle smoothing artifacts or unusual background blending.",
  },
};

const videos = {
  "2-5": {
    heading: "Parent and Child Guided Activity",
    description: "For ages 2–5, focus on simple conversations with a parent or caregiver rather than viewing complex deepfakes. Talk about how cameras take real pictures while computers and art supplies can draw pictures.",
    url: "https://www.commonsense.org/education/digital-citizenship",
    linkText: "Explore parent and educator activity guidelines",
  },
  "6-8": {
    heading: "Video: Understanding Media Literacy",
    description: "Watch child-friendly explainers together with an adult to practice spotting digital tricks and asking questions about what you see online.",
    url: "https://cisaad.umbc.edu/k-12-educator-resources/",
    linkText: "View K-12 digital citizenship resources",
  },
  "9-12": {
    heading: "Video & Guided Discussion",
    description: "Designed for young digital detectives. Learn how deepfakes are made and practice verification techniques with an educator or parent.",
    url: "https://www.pbs.org/newshour/classroom/lesson-plans/2022/12/lesson-plan-how-to-detect-deepfakes-to-ensure-you-dont-fall-for-disinformation",
    linkText: "PBS NewsHour: How to detect deepfakes guide",
  },
};

const ageNotes: Record<AgeBand, string> = {
  "2-5": "Parent-guided discovery: short conversations, familiar everyday objects, and no frightening deepfake footage.",
  "6-8": "Simple explanations, side-by-side picture comparisons, and child-focused discussions watched with an adult.",
  "9-12": "Detailed detective scenarios, source-checking checklists, and critical thinking about digital media manipulation.",
};

type VideoItem = {
  title: string;
  age: AgeBand[];
  topic: string;
  id: string;
  note: string;
};

const videoLibrary: VideoItem[] = [
  { title: "Fact vs. Fake: A Quick Lesson on Media Literacy", age: ["6-8", "9-12"], topic: "Fact-checking", id: "9MJFRr7mY-Y", note: "Watch together and practice questioning online claims." },
  { title: "Deepfakes: How to Spot Them", age: ["9-12"], topic: "Deepfakes", id: "IOyrbsNcXt8", note: "An adult preview is recommended before watching." },
  { title: "What Is AI for Kids?", age: ["6-8", "9-12"], topic: "AI basics", id: "PBJ9_G8d6mo", note: "Great introductory overview of machine learning." },
  { title: "What Cake Can Teach Us About AI", age: ["6-8", "9-12"], topic: "AI in daily life", id: "5DK4LHkpp4E", note: "Fun analogical exploration of training data." },
  { title: "Don't Let AI Fool You: How to Spot Deepfakes", age: ["6-8", "9-12"], topic: "Deepfakes", id: "mBpfonqYhhc", note: "Practical tips for young investigators." },
];

const comparisonPairs = [
  {
    topic: "Mountain Lake Landscape",
    category: "nature",
    real: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=640&auto=format&fit=crop",
    ai: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=640&auto=format&fit=crop",
    realCaption: "Real photo: Notice natural water ripples and atmospheric depth.",
    aiCaption: "AI interpretation: Notice surreal color grading and abstract lighting geometry.",
  },
  {
    topic: "Golden Retriever Dog",
    category: "animals",
    real: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=640&auto=format&fit=crop",
    ai: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=640&auto=format&fit=crop",
    realCaption: "Real photo: Authentic fur textures, whiskers, and natural eye glint.",
    aiCaption: "AI generation: Stylized rendering with overly smooth fur and uniform lighting.",
  },
  {
    topic: "Modern School Classroom",
    category: "school",
    real: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=640&auto=format&fit=crop",
    ai: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=640&auto=format&fit=crop",
    realCaption: "Real photo: Natural clutter, realistic textbook bindings, and varied seating.",
    aiCaption: "AI generation: Impossibly clean layout with repetitive background patterns.",
  },
  {
    topic: "Fresh Tropical Fruit Bowl",
    category: "daily",
    real: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=640&auto=format&fit=crop",
    ai: "https://images.unsplash.com/photo-1519996521430-025f917574b1?w=640&auto=format&fit=crop",
    realCaption: "Real photo: Natural blemishes, realistic reflections, and organic arrangement.",
    aiCaption: "AI generation: Glossy, hyper-saturated fruits with inconsistent shadow angles.",
  },
  {
    topic: "Friendly Robot Assistant",
    category: "imagination",
    real: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=640&auto=format&fit=crop",
    ai: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=640&auto=format&fit=crop",
    realCaption: "Real photo: Physical machinery with visible metallic joints and workshop background.",
    aiCaption: "AI generation: Fantastic digital rendering with floating holographic interface elements.",
  },
  {
    topic: "Bicycle on a Country Road",
    category: "daily",
    real: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=640&auto=format&fit=crop",
    ai: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=640&auto=format&fit=crop",
    realCaption: "Real photo: Accurate gear spoke count, worn tire treads, and asphalt grain.",
    aiCaption: "AI generation: Simplified spoke geometry and dreamy surreal background blur.",
  },
  {
    topic: "African Elephant in Savanna",
    category: "animals",
    real: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=640&auto=format&fit=crop",
    ai: "https://images.unsplash.com/photo-1564760055775-d63b19a75d11?w=640&auto=format&fit=crop",
    realCaption: "Real photo: Detailed skin wrinkles, natural dust tones, and realistic grassland.",
    aiCaption: "AI generation: Cinematic lighting with overly smooth textures and idealized flora.",
  },
  {
    topic: "Colorful Paper Kite",
    category: "imagination",
    real: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=640&auto=format&fit=crop",
    ai: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=640&auto=format&fit=crop",
    realCaption: "Real photo: Actual stitching on fabric, string tension, and outdoor wind motion.",
    aiCaption: "AI generation: Artistic illustration style with vibrant mathematical symmetry.",
  }
];

export default function ChildAcademy() {
  const [view, setView] = useState<
    "home" | "catalogue" | "lesson" | "certificate" | "videos" | "gallery"
  >("home");

  const [ageBand, setAgeBand] = useState<AgeBand>("6-8");
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [imageChallengeAnswer, setImageChallengeAnswer] = useState<number | null>(null);
  const [completed, setCompleted] = useState<number[]>([]);
  const [childName, setChildName] = useState("");
  const [galleryQuery, setGalleryQuery] = useState("");
  const [galleryTopic, setGalleryTopic] = useState("all");

  const filteredPairs = comparisonPairs.filter((pair) => {
    const q = galleryQuery.toLowerCase();
    const t = pair.topic.toLowerCase();
    const matchesText = !q || t.includes(q);
    const matchesCategory = galleryTopic === "all" || pair.category === galleryTopic;
    return matchesText && matchesCategory;
  });

  const lesson = lessons[selectedLesson];
  const progress = Math.round((completed.length / lessons.length) * 100);

  const openLesson = (index: number) => {
    setSelectedLesson(index);
    setSelectedAnswer(null);
    setImageChallengeAnswer(null);
    setView("lesson");
  };

  const completeLesson = () => {
    if (!completed.includes(lesson.id)) {
      setCompleted((previous) => [...previous, lesson.id]);
    }
    setSelectedAnswer(null);
    setImageChallengeAnswer(null);
    setView("catalogue");
  };

  return (
    <main className="child-academy">
      <style>{`
        .child-academy{max-width:1120px;margin:0 auto;padding:24px;color:#24183a;font-family:Nunito,Arial,sans-serif}
        .ca-hero{background:linear-gradient(135deg,#48208f,#7545c5);color:#fff;border-radius:24px;padding:30px;display:flex;justify-content:space-between;align-items:center;gap:20px}
        .ca-hero h1{font-size:clamp(28px,4vw,42px);margin:8px 0}
        .ca-hero p{color:#eee5ff;max-width:600px}
        .ca-mascot{font-size:64px}
        .ca-nav{display:flex;gap:10px;flex-wrap:wrap;margin:18px 0}
        .ca-btn{border:0;border-radius:12px;padding:11px 17px;background:#eee7fb;color:#4b258c;font-weight:800;cursor:pointer}
        .ca-btn.primary{background:#5b2ca5;color:white}
        .ca-btn:disabled{opacity:.45;cursor:not-allowed}
        .ca-card{background:white;border:1px solid #e8def6;border-radius:18px;padding:20px;box-shadow:0 5px 20px #3c20600b}
        .ca-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px}
        .ca-lesson{display:flex;align-items:center;gap:14px;text-align:left;width:100%;cursor:pointer;color:inherit}
        .ca-icon{font-size:34px;background:#f2ebff;border-radius:14px;padding:12px}
        .ca-muted{color:#6d627b}
        .ca-progress{height:9px;background:#eee7f8;border-radius:20px;overflow:hidden}
        .ca-progress span{display:block;height:100%;background:#7545c5}
        .ca-media-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
        .ca-media img{width:100%;height:220px;object-fit:cover;border-radius:12px;background:#eee}
        .ca-media a{color:#572ba0;font-weight:800}
        .ca-callout{background:#f5f0fc;border-left:4px solid #7545c5;padding:15px;border-radius:12px}
        .ca-option{display:block;width:100%;text-align:left;padding:13px;border:1px solid #e5d9f3;border-radius:12px;background:white;margin:8px 0;cursor:pointer;color:#24183a}
        .ca-option.chosen{border:2px solid #7545c5;background:#f5f0fc}
        .ca-good{color:#167447;font-weight:800}
        .ca-bad{color:#b42318;font-weight:800}
        .ca-video{border:1px solid #e8def6;border-radius:16px;padding:18px}
        .ca-footer{text-align:center;color:#766a88;margin-top:24px;font-size:13px}
        .ca-video-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:16px}
        .ca-video-frame{width:100%;aspect-ratio:16/9;border:0;border-radius:12px;background:#171326}
        .ca-pair-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:16px}
        .ca-pair{border:1px solid #e8def6;border-radius:16px;padding:16px;background:#fff}
        .ca-pair-images{display:grid;grid-template-columns:1fr 1fr;gap:10px}
        .ca-pair-images img{width:100%;height:160px;object-fit:cover;border-radius:10px;background:#eee}
        .ca-chip{display:inline-block;background:#f2ebff;color:#4b258c;padding:5px 9px;border-radius:99px;font-size:12px;font-weight:800;margin-right:6px;margin-bottom:6px}
        .ca-gallery-tools{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin:12px 0}
        .ca-gallery-tools input,.ca-gallery-tools select{padding:10px;border:1px solid #d9c9ed;border-radius:10px;flex:1;min-width:200px}
        
        /* Certificate Print Styling */
        .ca-certificate-box{background:linear-gradient(135deg,#fcfaff,#f2ebff);border:6px double #7545c5;border-radius:24px;padding:40px;text-align:center;max-width:760px;margin:20px auto;box-shadow:0 10px 30px rgba(75,37,140,0.15)}
        .ca-cert-title{font-size:clamp(22px,3vw,36px);color:#4b258c;font-weight:800;margin-bottom:8px}
        .ca-cert-name{font-size:clamp(26px,4vw,40px);color:#24183a;font-weight:900;border-bottom:3px solid #7545c5;display:inline-block;padding:0 20px;margin:15px 0}
        
        @media(max-width:620px){
          .child-academy{padding:12px}
          .ca-hero{padding:22px}
          .ca-mascot{font-size:42px}
          .ca-media-grid{grid-template-columns:1fr}
          .ca-media img{height:200px}
          .ca-pair-images img{height:130px}
        }
        @media print{
          .ca-nav,.ca-no-print,.ca-hero,.ca-footer{display:none!important}
          .child-academy{max-width:none;padding:0}
          .ca-certificate-box{border:4px solid #4b258c;box-shadow:none;margin:0;width:100%}
        }
      `}</style>

      <header className="ca-hero">
        <div>
          <div style={{fontWeight:800,letterSpacing:1}}>
            SAFESPACE AI · CHILD ACADEMY
          </div>
          <h1>Learn. Explore. Stay Safe!</h1>
          <p>
            Discover how AI pictures, videos and voices can be created or
            changed—and learn what to do before you trust or share them.
          </p>
        </div>
        <div className="ca-mascot" aria-hidden="true">🛡️</div>
      </header>

      <nav className="ca-nav ca-no-print" aria-label="Child Academy navigation">
        <button className={`ca-btn ${view === "home" ? "primary" : ""}`} onClick={() => setView("home")}>Home</button>
        <button className={`ca-btn ${view === "catalogue" ? "primary" : ""}`} onClick={() => setView("catalogue")}>Lessons</button>
        <button className={`ca-btn ${view === "certificate" ? "primary" : ""}`} onClick={() => setView("certificate")}>My Award</button>
        <button className={`ca-btn ${view === "videos" ? "primary" : ""}`} onClick={() => setView("videos")}>Video Library</button>
        <button className={`ca-btn ${view === "gallery" ? "primary" : ""}`} onClick={() => setView("gallery")}>Image Detective Gallery</button>
      </nav>

      {view === "home" && (
        <section className="ca-card">
          <h2>Welcome, young explorer!</h2>
          <p className="ca-muted">Choose an age group so the activities and media guidance match your learning level.</p>
          <label htmlFor="age-band"><strong>Learning age group</strong></label>
          <select
            id="age-band"
            value={ageBand}
            onChange={(event) => setAgeBand(event.target.value as AgeBand)}
            style={{display:"block",margin:"9px 0 14px",padding:11,borderRadius:10,border:"1px solid #d9c9ed",maxWidth:320,width:"100%"}}
          >
            <option value="2-5">2–5 years · Parent guided</option>
            <option value="6-8">6–8 years · Explore together</option>
            <option value="9-12">9–12 years · Young digital detectives</option>
          </select>
          <div className="ca-callout">{ageNotes[ageBand]}</div>
          <h3 style={{marginTop:24}}>Your learning journey</h3>
          <p><strong>{completed.length} of 6 lessons completed</strong> · {progress}%</p>
          <div className="ca-progress"><span style={{width:`${progress}%`}} /></div>
          <div className="ca-grid" style={{marginTop:20}}>
            {lessons.slice(0,3).map((item,index)=>(
              <button key={item.id} className="ca-card ca-lesson" onClick={()=>openLesson(index)}>
                <span className="ca-icon">{item.icon}</span>
                <span><strong>{item.title}</strong><br/><small className="ca-muted">{item.duration} · Start learning</small></span>
              </button>
            ))}
          </div>
          <button className="ca-btn primary" style={{marginTop:18}} onClick={()=>setView("catalogue")}>Explore all lessons →</button>
        </section>
      )}

      {view === "catalogue" && (
        <section>
          <h2>Learning adventures</h2>
          <p className="ca-muted">Six short lessons. Complete the quick challenges in each one to record your progress and earn your certificate.</p>
          <div className="ca-grid" style={{marginTop:16}}>
            {lessons.map((item,index)=>(
              <button key={item.id} className="ca-card ca-lesson" onClick={()=>openLesson(index)}>
                <span className="ca-icon">{item.icon}</span>
                <span>
                  <strong>{item.id}. {item.title}</strong><br/>
                  <small className="ca-muted">{item.subtitle}</small><br/>
                  <small>{completed.includes(item.id) ? "✓ Completed" : item.duration}</small>
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {view === "videos" && (
        <section>
          <h2>Child Academy Video Library</h2>
          <p className="ca-muted">Curated educational videos to deepen digital awareness. An adult should preview each video before use.</p>
          <div className="ca-callout">
            <strong>For ages 2–5:</strong> This library is designed for parent-led discussions rather than independent screen time.
          </div>
          <div className="ca-video-grid" style={{marginTop:16}}>
            {videoLibrary
              .filter(video => ageBand !== "2-5" && video.age.includes(ageBand))
              .map((video,index)=>(
                <article className="ca-video ca-card" key={`${video.id}-${index}`}>
                  <div>
                    <span className="ca-chip">{video.topic}</span>
                    <span className="ca-chip">Ages {video.age.join(" / ")}</span>
                  </div>
                  <h3>{video.title}</h3>
                  <iframe
                    className="ca-video-frame"
                    src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                    title={video.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                  <p className="ca-muted" style={{marginTop:8}}>{video.note}</p>
                </article>
              ))}
          </div>
        </section>
      )}

      {view === "gallery" && (
        <section>
          <h2>Image Detective Comparison Gallery</h2>
          <p className="ca-muted">
            Compare authentic photographs side-by-side with AI-generated or synthetic imagery. Spotting the difference builds critical digital literacy!
          </p>
          <div className="ca-callout">
            <strong>Detective Tip:</strong> Look closely at background lighting consistency, object reflections, shadows, and intricate edge details.
          </div>
          <div className="ca-gallery-tools" style={{marginTop:16}}>
            <input
              aria-label="Search image topics"
              placeholder="Search comparison topics..."
              value={galleryQuery}
              onChange={event=>setGalleryQuery(event.target.value)}
            />
            <select
              aria-label="Gallery category filter"
              value={galleryTopic}
              onChange={event=>setGalleryTopic(event.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="animals">Animals</option>
              <option value="school">School & Learning</option>
              <option value="nature">Nature & Places</option>
              <option value="daily">Everyday Life</option>
              <option value="imagination">Imagination</option>
            </select>
          </div>
          <p><strong>Showing {filteredPairs.length} comparison pairs</strong></p>
          <div className="ca-pair-grid" style={{marginTop:16}}>
            {filteredPairs.map((pair, idx)=>(
              <article className="ca-pair ca-card" key={idx}>
                <span className="ca-chip">Topic #{idx + 1}</span>
                <h3>{pair.topic}</h3>
                <div className="ca-pair-images" style={{marginTop:10}}>
                  <div>
                    <span className="ca-chip" style={{background:"#e3fcef",color:"#0c5132"}}>Real Photo</span>
                    <img
                      loading="lazy"
                      src={pair.real}
                      alt={`Real photograph of ${pair.topic}`}
                    />
                    <small className="ca-muted" style={{display:"block",marginTop:4}}>{pair.realCaption}</small>
                  </div>
                  <div>
                    <span className="ca-chip" style={{background:"#fdefed",color:"#791a13"}}>AI Example</span>
                    <img
                      loading="lazy"
                      src={pair.ai}
                      alt={`AI generated example of ${pair.topic}`}
                    />
                    <small className="ca-muted" style={{display:"block",marginTop:4}}>{pair.aiCaption}</small>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {view === "lesson" && (
        <section className="ca-card">
          <div className="ca-no-print" style={{display:"flex",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
            <button className="ca-btn" onClick={()=>setView("catalogue")}>← All lessons</button>
            <span className="ca-muted">LESSON {lesson.id} OF 6</span>
          </div>
          <h2>{lesson.icon} {lesson.title}</h2>
          <p className="ca-muted">{lesson.subtitle} · {lesson.duration}</p>
          <h3>Let's learn</h3>
          <p>{lesson.explanation}</p>
          <div className="ca-callout">
            <strong>Example:</strong> {lesson.example}<br/><br/>
            <strong>Remember:</strong> {lesson.tip}
          </div>

          {lesson.id === 2 && (
            <div style={{marginTop:22}}>
              <h3>Spotting Real vs. Synthetic Images</h3>
              <p className="ca-muted">Examine these two side-by-side examples to understand how photographs differ from generated media.</p>
              <div className="ca-media-grid" style={{marginTop:12}}>
                <article className="ca-media ca-card">
                  <img src={media.realPhoto.image} alt="Authentic mountain landscape photograph" loading="lazy"/>
                  <h4>{media.realPhoto.title}</h4>
                  <p className="ca-muted">{media.realPhoto.note}</p>
                  <a href={media.realPhoto.source} target="_blank" rel="noreferrer">Source reference ↗</a>
                </article>
                <article className="ca-media ca-card">
                  <img src={media.aiImage.image} alt="AI-generated synthetic portrait example" loading="lazy"/>
                  <h4>{media.aiImage.title}</h4>
                  <p className="ca-muted">{media.aiImage.note}</p>
                  <a href={media.aiImage.source} target="_blank" rel="noreferrer">Source reference ↗</a>
                </article>
              </div>
            </div>
          )}

          {lesson.id === 3 && (
            <div className="ca-video" style={{marginTop:22}}>
              <h3>{videos[ageBand].heading}</h3>
              <p>{videos[ageBand].description}</p>
              <a href={videos[ageBand].url} target="_blank" rel="noreferrer">{videos[ageBand].linkText} ↗</a>
            </div>
          )}

          {/* Interactive Real vs Fake Image Challenge */}
          {lesson.challengeType === "image-spotter" && lesson.challengeImages && (
            <div style={{marginTop:24, background:"#fcfaff", border:"1px solid #d9c9ed", borderRadius:16, padding:20}}>
              <h3>🔎 Real vs. Fake Image Detective Challenge</h3>
              <p><strong>{lesson.challengeImages.questionText}</strong></p>
              
              <div className="ca-media-grid" style={{marginTop:12}}>
                <article className="ca-card" style={{background:"#fff"}}>
                  <span className="ca-chip" style={{background:"#e3fcef",color:"#0c5132"}}>Option A</span>
                  <img src={lesson.challengeImages.realUrl} alt="Real challenge option" style={{width:"100%", height:180, objectFit:"cover", borderRadius:10, marginTop:8}}/>
                  <p className="ca-muted" style={{fontSize:13, marginTop:6}}>{lesson.challengeImages.realCaption}</p>
                </article>
                <article className="ca-card" style={{background:"#fff"}}>
                  <span className="ca-chip" style={{background:"#fdefed",color:"#791a13"}}>Option B</span>
                  <img src={lesson.challengeImages.fakeUrl} alt="AI challenge option" style={{width:"100%", height:180, objectFit:"cover", borderRadius:10, marginTop:8}}/>
                  <p className="ca-muted" style={{fontSize:13, marginTop:6}}>{lesson.challengeImages.fakeCaption}</p>
                </article>
              </div>

              <div style={{marginTop:16}}>
                {lesson.challengeImages.options.map((opt, optIdx)=>(
                  <button
                    key={opt}
                    className={`ca-option ${imageChallengeAnswer === optIdx ? "chosen" : ""}`}
                    onClick={()=>setImageChallengeAnswer(optIdx)}
                  >
                    {String.fromCharCode(65+optIdx)}. {opt}
                  </button>
                ))}
              </div>

              {imageChallengeAnswer !== null && (
                <div style={{marginTop:12}}>
                  {imageChallengeAnswer === lesson.challengeImages.answer ? (
                    <p className="ca-good">Spot on! You correctly identified the authentic photograph. 🎉</p>
                  ) : (
                    <p className="ca-bad">Not quite. Look closely at the lighting and textures and try again!</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Standard Quiz Challenge */}
          <div style={{marginTop:24}}>
            <h3>Quick knowledge check</h3>
            <p><strong>{lesson.question}</strong></p>
            {lesson.options.map((option,index)=>(
              <button
                key={option}
                className={`ca-option ${selectedAnswer === index ? "chosen" : ""}`}
                onClick={()=>setSelectedAnswer(index)}
              >
                {String.fromCharCode(65+index)}. {option}
              </button>
            ))}
            {selectedAnswer !== null && (
              <div style={{marginTop:12}}>
                {selectedAnswer === lesson.answer ? (
                  <>
                    <p className="ca-good">Correct! Great thinking. 🎉</p>
                    <button 
                      className="ca-btn primary" 
                      onClick={completeLesson}
                      disabled={lesson.challengeType === "image-spotter" && imageChallengeAnswer !== lesson.challengeImages?.answer}
                    >
                      Complete Lesson
                    </button>
                    {lesson.challengeType === "image-spotter" && imageChallengeAnswer !== lesson.challengeImages?.answer && (
                      <p className="ca-muted" style={{fontSize:12, marginTop:4}}>Please also complete the image detective challenge above correctly to finish!</p>
                    )}
                  </>
                ) : (
                  <>
                    <p className="ca-bad">Not quite. Read the tip again and try once more.</p>
                    <button className="ca-btn" onClick={()=>setSelectedAnswer(null)}>Try again</button>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="ca-no-print" style={{display:"flex",justifyContent:"space-between",marginTop:24}}>
            <button className="ca-btn" disabled={selectedLesson===0} onClick={()=>openLesson(selectedLesson-1)}>← Previous</button>
            <button className="ca-btn" disabled={selectedLesson===lessons.length-1} onClick={()=>openLesson(selectedLesson+1)}>Next →</button>
          </div>
        </section>
      )}

      {view === "certificate" && (
        <section className="ca-card" style={{textAlign:"center",padding:20}}>
          {completed.length === lessons.length ? (
            <div className="ca-certificate-box">
              <div style={{fontSize:48, marginBottom:10}}>🏆</div>
              <div className="ca-cert-title">Certificate of Achievement</div>
              <p className="ca-muted" style={{fontSize:14, textTransform:"uppercase", letterSpacing:2}}>SafeSpace AI Digital Detective Academy</p>
              
              <p style={{marginTop:20, fontSize:15}}>This official award is proudly presented to:</p>
              
              <div className="ca-no-print" style={{margin:"15px 0"}}>
                <label htmlFor="child-name" style={{display:"block", fontWeight:800, marginBottom:6}}>Enter the name you wish to appear on your certificate:</label>
                <input
                  id="child-name"
                  value={childName}
                  onChange={event=>setChildName(event.target.value)}
                  placeholder="e.g., Reagan or Young Explorer"
                  style={{padding:12, border:"2px solid #7545c5", borderRadius:10, maxWidth:340, width:"100%", textAlign:"center", fontSize:18, fontWeight:700}}
                />
              </div>

              <div className="ca-cert-name">
                {childName.trim() || "___________ (Your Name)"}
              </div>

              <p style={{maxWidth:540, margin:"15px auto", lineHeight:1.6}}>
                For successfully completing all 6 learning adventures, passing the interactive real vs. fake image quizzes, and mastering the skills to safely navigate digital media, deepfakes, and online information!
              </p>

              <div style={{display:"flex", justifyContent:"space-around", marginTop:35, fontWeight:800, color:"#4b258c", fontSize:14}}>
                <div>
                  <p>Date: {new Date().toLocaleDateString()}</p>
                  <span style={{borderTop:"2px solid #4b258c", display:"block", width:150, margin:"5px auto 0"}}></span>
                  <small>Completion Date</small>
                </div>
                <div>
                  <p>🛡️ Verified Explorer</p>
                  <span style={{borderTop:"2px solid #4b258c", display:"block", width:150, margin:"5px auto 0"}}></span>
                  <small>SafeSpace AI Academy</small>
                </div>
              </div>

              <div style={{marginTop:30}}>
                <button className="ca-btn primary ca-no-print" style={{fontSize:16, padding:"12px 24px"}} onClick={()=>window.print()}>🖨️ Print My Certificate</button>
              </div>
            </div>
          ) : (
            <div style={{padding:30}}>
              <div style={{fontSize:56}}>🔒</div>
              <h2>Certificate Locked</h2>
              <p style={{marginTop:10}}>You have completed <strong>{completed.length} of 6 lessons</strong>.</p>
              <p className="ca-muted">Finish all lessons and pass the detective quizzes to unlock and customize your official printable certificate!</p>
              <button className="ca-btn primary" style={{marginTop:16}} onClick={()=>setView("catalogue")}>Continue Learning →</button>
            </div>
          )}
          <p className="ca-muted ca-no-print" style={{fontSize:13, marginTop:20}}>This is a local achievement award. Progress is stored in your current browser session.</p>
        </section>
      )}

      <footer className="ca-footer">SAFESPACE AI · Learn smart. Check before you share. 💜</footer>
    </main>
  );
}
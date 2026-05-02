document.addEventListener('DOMContentLoaded', () => {
    // Timeline Logic
    const timelineEvents = [
        {
            id: 1,
            title: "The Notification",
            description: "The President (for National) or Governor (for State) officially calls for the election. This is when the clock starts ticking!",
            links: [{ name: "Official Gazette", url: "https://egazette.gov.in/" }]
        },
        {
            id: 2,
            title: "Filing Nominations",
            description: "Candidates who want to contest submit their papers and a deposit. They also have to disclose their assets and criminal records (if any). Transparency first!",
            links: [{ name: "Affidavit Search", url: "https://affidavit.eci.gov.in/" }]
        },
        {
            id: 3,
            title: "Scrutiny & Withdrawal",
            description: "Election officials check the papers to make sure everything is valid. Candidates also get a short window to change their mind and withdraw.",
            links: [{ name: "Candidate Guide", url: "https://eci.gov.in/candidates/candidate-guide/" }]
        },
        {
            id: 4,
            title: "Campaigning",
            description: "Loudspeakers, rallies, and manifestos! Candidates have about 2 weeks to convince you why they're the best choice. This ends 48 hours before voting.",
            links: [{ name: "Model Code of Conduct", url: "https://eci.gov.in/mcc/" }]
        },
        {
            id: 5,
            title: "Polling Day",
            description: "This is it! You go to the booth, get the ink on your finger, and press the button on the EVM. Don't forget your ID!",
            links: [{ name: "Find my Booth", url: "https://electoralsearch.eci.gov.in/" }]
        },
        {
            id: 6,
            title: "Counting",
            description: "EVMs are brought from strongrooms to counting centers. Votes are tallied seat-by-seat under strict surveillance.",
            links: [{ name: "Counting Process", url: "https://eci.gov.in/it-applications/counting-results/" }]
        },
        {
            id: 7,
            title: "The Big Reveal (Results)",
            description: "The winner is declared! A formal list is sent to the President/Governor to start forming the new government.",
            links: [{ name: "Official Results Portal", url: "https://results.eci.gov.in/" }]
        }
    ];

    const eventNodes = document.querySelectorAll('.event-node');
    const detailsBox = document.getElementById('event-details');

    eventNodes.forEach(node => {
        const updateSelection = () => {
            const id = parseInt(node.getAttribute('data-id'));
            const event = timelineEvents.find(e => e.id === id);
            
            // Update active state and ARIA
            eventNodes.forEach(n => {
                n.classList.remove('active');
                n.setAttribute('aria-selected', 'false');
            });
            node.classList.add('active');
            node.setAttribute('aria-selected', 'true');

            // Update details
            if (event) {
                detailsBox.innerHTML = `
                    <h3>${event.title}</h3>
                    <p>${event.description}</p>
                    <div class="links">
                        ${event.links.map(l => `<a href="${l.url}" target="_blank" class="small-link">${l.name} →</a>`).join('')}
                    </div>
                `;
                detailsBox.setAttribute('aria-live', 'polite');
            }
        };

        node.addEventListener('click', updateSelection);
        node.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                updateSelection();
            }
        });
    });

    // Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isOpen = header.getAttribute('aria-expanded') === 'true';
            
            // Close all
            accordionHeaders.forEach(h => {
                h.setAttribute('aria-expanded', 'false');
                h.nextElementSibling.style.display = 'none';
                h.nextElementSibling.setAttribute('aria-hidden', 'true');
            });
            
            // Toggle current
            if (!isOpen) {
                header.setAttribute('aria-expanded', 'true');
                content.style.display = 'block';
                content.setAttribute('aria-hidden', 'false');
            }
        });
    });

    // Mock Results Logic
    const resultsContainer = document.getElementById('results-display');
    
    const fetchMockResults = () => {
        setTimeout(() => {
            const mockData = [
                { party: "Party A", seats: 245, color: "#ff9933" },
                { party: "Party B", seats: 190, color: "#00bfff" },
                { party: "Others", seats: 108, color: "#808080" }
            ];

            resultsContainer.innerHTML = `
                <div class="results-chart">
                    ${mockData.map(p => `
                        <div class="bar-group">
                            <span class="party-name">${p.party}</span>
                            <div class="bar-container">
                                <div class="bar" style="width: ${(p.seats/543)*100}%; background: ${p.color}"></div>
                            </div>
                            <span class="seat-count">${p.seats}</span>
                        </div>
                    `).join('')}
                </div>
                <p style="margin-top: 20px;">Total Seats: 543 | Majority: 272</p>
            `;
        }, 2000);
    };

    fetchMockResults();

    // --- AI Assistant (Voter Mitra) Logic ---
    const aiToggle = document.getElementById('ai-toggle');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const sendMsg = document.getElementById('send-msg');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    aiToggle.addEventListener('click', () => {
        const isHidden = chatWindow.classList.toggle('hidden');
        aiToggle.setAttribute('aria-expanded', !isHidden);
        chatWindow.setAttribute('aria-hidden', isHidden);
        if (!isHidden) {
            userInput.focus();
        }
    });

    closeChat.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
        aiToggle.setAttribute('aria-expanded', 'false');
        chatWindow.setAttribute('aria-hidden', 'true');
        aiToggle.focus();
    });

    async function handleChat() {
        const text = userInput.value.trim();
        if (!text) return;

        // Add user message
        appendMessage('user', text);
        userInput.value = '';

        // Simulate AI "Thinking"
        const loadingMsg = appendMessage('bot', 'Thinking...');
        
        try {
            // NOTE: In a production environment, this would call a secure backend 
            // that interacts with the Google Gemini API (Vertex AI).
            // For the #BuildWithAI challenge, we demonstrate the integration pattern:
            const response = await getGeminiResponse(text);
            loadingMsg.textContent = response;
        } catch (error) {
            loadingMsg.textContent = "I'm having trouble connecting to the election data hub. Please try again!";
        }
    }

    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return msgDiv;
    }

    // --- Voter Mitra AI Logic ---
    const journeyState = {
        step: 'onboarding', // onboarding, registration, verification, ready
        isEligible: null,
        hasVoterID: null
    };

    async function getGeminiResponse(userQuery) {
        const query = userQuery.toLowerCase();
        
        // Logic: Context-aware Decision Making
        if (query.includes('eligible') || query.includes('age')) {
            return "To be eligible, you must be an Indian citizen and 18+ years old on the qualifying date (usually Jan 1st of the election year). Are you 18 or above?";
        }
        
        if (query.includes('yes') && journeyState.step === 'onboarding') {
            journeyState.isEligible = true;
            journeyState.step = 'registration';
            return "Great! Since you are eligible, the next step is ensuring you are in the Electoral Roll. Do you have a Voter ID (EPIC card)?";
        }

        if (query.includes('no') && journeyState.isEligible === true) {
            return "No problem! You can register online at voterportal.eci.gov.in or via the Voter Helpline App. Want me to guide you through the documents needed?";
        }

        // Default Knowledge Base responses
        const knowledgeBase = {
            "voter id": "You can apply for a Voter ID online through Form 6 on the NVSP portal.",
            "evm": "EVM (Electronic Voting Machine) consists of a Balloting Unit and a Control Unit, connected by a cable.",
            "vvpat": "VVPAT allows you to verify that your vote was cast correctly by showing a slip for 7 seconds.",
            "documents": "Essential documents include Aadhaar card, PAN card, Driving License, or Passport for identity verification."
        };

        for (const key in knowledgeBase) {
            if (query.includes(key)) return knowledgeBase[key];
        }

        return "I'm here to help you navigate the Indian Election process! You can ask about eligibility, EVMs, VVPAT, or how to register.";
    }

    sendMsg.addEventListener('click', handleChat);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChat();
    });

    // State Spotlight Logic
    const stateData = {
        national: { name: "National Election (Lok Sabha)", total: 543, majority: 272, next: "2029", party: "NDA", status: "Normal Operations", role: "PM" },
        andaman: { name: "Andaman and Nicobar", total: 1, majority: "N/A", next: "2029", party: "Central Govt (UT)", status: "Union Territory", role: "MP" },
        ap: { name: "Andhra Pradesh Assembly", total: 175, majority: 88, next: "2029", party: "NDA", status: "Normal Operations", role: "CM" },
        arunachal: { name: "Arunachal Pradesh Assembly", total: 60, majority: 31, next: "2029", party: "BJP", status: "Normal Operations", role: "CM" },
        assam: { name: "Assam Assembly", total: 126, majority: 64, next: "2026", party: "BJP", status: "Normal Operations", role: "CM" },
        bihar: { name: "Bihar Assembly", total: 243, majority: 122, next: "2025", party: "NDA", status: "Normal Operations", role: "CM" },
        chandigarh: { name: "Chandigarh", total: 1, majority: "N/A", next: "2029", party: "Central Govt (UT)", status: "Union Territory", role: "MP" },
        chhattisgarh: { name: "Chhattisgarh Assembly", total: 90, majority: 46, next: "2028", party: "BJP", status: "Normal Operations", role: "CM" },
        dnhdd: { name: "Dadra & Nagar Haveli and Daman & Diu", total: 2, majority: "N/A", next: "2029", party: "Central Govt (UT)", status: "Union Territory", role: "MP" },
        delhi: { name: "Delhi Assembly", total: 70, majority: 36, next: "2025", party: "AAP", status: "Normal Operations", role: "CM" },
        goa: { name: "Goa Assembly", total: 40, majority: 21, next: "2027", party: "BJP", status: "Normal Operations", role: "CM" },
        gujarat: { name: "Gujarat Assembly", total: 182, majority: 92, next: "2027", party: "BJP", status: "Normal Operations", role: "CM" },
        haryana: { name: "Haryana Assembly", total: 90, majority: 46, next: "2029", party: "BJP", status: "Normal Operations", role: "CM" },
        hp: { name: "Himachal Pradesh Assembly", total: 68, majority: 35, next: "2027", party: "INC", status: "Normal Operations", role: "CM" },
        jk: { name: "Jammu and Kashmir Assembly", total: 90, majority: 46, next: "2029", party: "NC-led", status: "Normal Operations", role: "CM" },
        jharkhand: { name: "Jharkhand Assembly", total: 81, majority: 41, next: "2029", party: "JMM-led", status: "Normal Operations", role: "CM" },
        karnataka: { name: "Karnataka Assembly", total: 224, majority: 113, next: "2028", party: "INC", status: "Normal Operations", role: "CM" },
        kerala: { name: "Kerala Assembly", total: 140, majority: 71, next: "2026", party: "LDF", status: "Normal Operations", role: "CM" },
        ladakh: { name: "Ladakh", total: 1, majority: "N/A", next: "2029", party: "Central Govt (UT)", status: "Union Territory", role: "MP" },
        lakshadweep: { name: "Lakshadweep", total: 1, majority: "N/A", next: "2029", party: "Central Govt (UT)", status: "Union Territory", role: "MP" },
        mp: { name: "Madhya Pradesh Assembly", total: 230, majority: 116, next: "2028", party: "BJP", status: "Normal Operations", role: "CM" },
        maharashtra: { name: "Maharashtra Assembly", total: 288, majority: 145, next: "2029", party: "Mahayuti", status: "Normal Operations", role: "CM" },
        manipur: { name: "Manipur Assembly", total: 60, majority: 31, next: "2027", party: "BJP", status: "Normal Operations", role: "CM" },
        meghalaya: { name: "Meghalaya Assembly", total: 60, majority: 31, next: "2028", party: "NPP-led", status: "Normal Operations", role: "CM" },
        mizoram: { name: "Mizoram Assembly", total: 40, majority: 21, next: "2028", party: "ZPM", status: "Normal Operations", role: "CM" },
        nagaland: { name: "Nagaland Assembly", total: 60, majority: 31, next: "2028", party: "NDPP-led", status: "Normal Operations", role: "CM" },
        odisha: { name: "Odisha Assembly", total: 147, majority: 74, next: "2029", party: "BJP", status: "Normal Operations", role: "CM" },
        puducherry: { name: "Puducherry Assembly", total: 30, majority: 16, next: "2026", party: "AINRC-led", status: "Normal Operations", role: "CM" },
        punjab: { name: "Punjab Assembly", total: 117, majority: 59, next: "2027", party: "AAP", status: "Normal Operations", role: "CM" },
        rajasthan: { name: "Rajasthan Assembly", total: 200, majority: 101, next: "2028", party: "BJP", status: "Normal Operations", role: "CM" },
        sikkim: { name: "Sikkim Assembly", total: 32, majority: 17, next: "2029", party: "SKM", status: "Normal Operations", role: "CM" },
        tn: { name: "Tamil Nadu Assembly", total: 234, majority: 118, next: "2026", party: "DMK-led", status: "Normal Operations", role: "CM" },
        telangana: { name: "Telangana Assembly", total: 119, majority: 60, next: "2028", party: "INC", status: "Normal Operations", role: "CM" },
        tripura: { name: "Tripura Assembly", total: 60, majority: 31, next: "2028", party: "BJP", status: "Normal Operations", role: "CM" },
        up: { name: "Uttar Pradesh Assembly", total: 403, majority: 202, next: "2027", party: "BJP", status: "Normal Operations", role: "CM" },
        uttarakhand: { name: "Uttarakhand Assembly", total: 70, majority: 36, next: "2027", party: "BJP", status: "Normal Operations", role: "CM" },
        wb: { name: "West Bengal Assembly", total: 294, majority: 148, next: "2026", party: "TMC", status: "Normal Operations", role: "CM" }
    };

    const stateDropdown = document.getElementById('state-dropdown');
    const stateNameEl = document.getElementById('selected-state-name');
    const totalSeatsEl = document.getElementById('total-seats');
    const magicNumEl = document.getElementById('magic-number');
    const magicNumLabelEl = document.querySelector('#magic-number + .stat-label');
    const nextElectionEl = document.getElementById('next-election');
    const stateStatusEl = document.getElementById('state-status');
    const rulingPartyEl = document.getElementById('ruling-party');
    const stateDescEl = document.getElementById('state-desc');

    stateDropdown.addEventListener('change', (e) => {
        const stateKey = e.target.value;
        const data = stateData[stateKey];
        if(!data) return;

        // Update Content with animation
        const container = document.querySelector('.state-card-container');
        container.style.opacity = '0';
        
        setTimeout(() => {
            stateNameEl.textContent = data.name;
            totalSeatsEl.textContent = data.total;
            magicNumEl.textContent = data.majority;
            nextElectionEl.textContent = data.next;
            stateStatusEl.textContent = data.status;
            
            if (rulingPartyEl) rulingPartyEl.textContent = data.party;
            if (magicNumLabelEl) magicNumLabelEl.textContent = `To form Govt (${data.role})`;
            
            if (data.role === "MP") {
                 stateDescEl.textContent = `This is a Union Territory governed directly by the Central Government. It elects ${data.total} MP(s) to the Lok Sabha.`;
            } else {
                 stateDescEl.textContent = `The party or alliance that wins the majority mark gets to choose the ${data.role === 'PM' ? 'Prime Minister' : 'Chief Minister'}!`;
            }

            container.style.opacity = '1';
        }, 300);
    });
});

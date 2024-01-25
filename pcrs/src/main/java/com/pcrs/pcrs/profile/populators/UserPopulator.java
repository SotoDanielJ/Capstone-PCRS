package com.pcrs.pcrs.profile.populators;

import java.util.ArrayList;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.pcrs.pcrs.profile.models.BlogPost;
import com.pcrs.pcrs.profile.models.UserProfileModel;
import com.pcrs.pcrs.profile.repos.BlogPostRepository;
import com.pcrs.pcrs.profile.repos.UserProfileRepository;

import jakarta.annotation.Resource;

@Component
public class UserPopulator implements CommandLineRunner {

        @Resource
        private UserProfileRepository userProfileRepository;
        @Resource
        private BlogPostRepository blogPostRepository;

        public UserPopulator(UserProfileRepository userProfileRepository, BlogPostRepository blogPostRepository) {
                this.userProfileRepository = userProfileRepository;
                this.blogPostRepository = blogPostRepository;
        }

        private UserProfileModel createDummyFollower(String firstName, String lastName, String username) {
                UserProfileModel follower = new UserProfileModel();
                follower.setFirstName(firstName);
                follower.setLastName(lastName);
                follower.setUsername(username);
                userProfileRepository.save(follower);
                return follower;
        }

        private BlogPost createDummyPost(UserProfileModel user, String title, String content, int categoryIndex) {
                BlogPost post = new BlogPost();
                post.setUser(user);
                post.setTitle(title);
                post.setContent(content);
                post.setCategoryIndex(categoryIndex);
                blogPostRepository.save(post);
                return post;
        }

        @Override
        public void run(String... args) throws Exception {

                UserProfileModel user1 = new UserProfileModel();
                user1.setFirstName("Brian");
                user1.setLastName("Ortiz");
                user1.setDob("18JUN1995");
                user1.setEmail("briortiz95@hotmail.com");
                user1.setUsername("BrianO95");
                user1.setPassword("password123");

                user1.setBio(
                                "Hello! I'm Brian and I am an aspiring software developer currently enrolled in a course to learn Java and React. I don't know much about computer specifications.");
                user1.setSetupDescription(
                                "High-performance gaming rig featuring powerful GPU, multi-core CPU, ample RAM, fast SSD storage, RGB lighting, liquid cooling, and high-refresh-rate monitor.");
                user1.setThemeColorPref(5);
                UserProfileModel follower11 = createDummyFollower("John", "Doe", "john_doe");
                UserProfileModel follower21 = createDummyFollower("Jane", "Doe", "jane_doe");
                UserProfileModel follower31 = createDummyFollower("Alice", "Smith", "alice_smith");
                UserProfileModel follower4 = createDummyFollower("John", "Doe", "john_doe1");
                UserProfileModel follower5 = createDummyFollower("Jane", "Doe", "jane_doe1");
                UserProfileModel follower6 = createDummyFollower("Alice", "Smith", "alice_smith1");

                user1.getFollowers().add(follower11);
                user1.getFollowers().add(follower21);
                user1.getFollowers().add(follower31);
                user1.getFollowers().add(follower4);
                user1.getFollowers().add(follower5);
                user1.getFollowers().add(follower6);

                userProfileRepository.save(user1);
                createDummyPost(user1, "VR Gaming is Here to Stay: Get Ready to Dive In!",
                                "Hey gamers! Have you tried VR gaming yet? It's like stepping into a whole new world, literally. I recently got my hands on a VR headset and, let me tell you, it's a game-changer. Games like 'Beat Saber' have me swinging my arms like a madman, and 'Half-Life: Alyx'? Mind-blowing! The cool part is you're not just sitting on a couch with a controller; you're moving around, ducking, dodging - it's a workout and a half. But the best part? You totally forget you're in your living room. It's like you're actually there in the game. Sure, the headsets can be a bit pricey, but if you're looking for a wild new gaming experience, VR is where it's at. Can't wait to see what's next!",
                                0);

                createDummyPost(user1, "Console Wars: My Take on the PlayStation vs Xbox Saga",
                                "Okay, so let's talk console wars. It's like the never-ending battle of the gaming gods - PlayStation and Xbox. I've had both, and honestly, each has its ups and downs. PlayStation games have these amazing exclusive titles, but Xbox? That Game Pass is a total game changer. Every time a new console drops, it's like the whole gaming world holds its breath. Who's got the better graphics? The cooler games? I'm torn between the two. I love the sleek design of the PS5, but then again, Xbox's backward compatibility is a big win. It's like choosing between pizza and burgers – both are awesome in their own way. What do you guys think? Are you Team PlayStation or Team Xbox? Let's settle this once and for all!",
                                0);

                createDummyPost(user1, "Why I Swapped My Laptop for a Tablet and Never Looked Back",
                                "So, I finally ditched my bulky old laptop for a sleek new tablet, and guess what? Best. Decision. Ever. This thing is like a magic slate – it's super lightweight, easy to carry around, and the touch screen is a dream. I use it for everything from watching movies to working on-the-go. And with a keyboard attachment, it's basically a laptop but cooler. Plus, the battery life is insane! Seriously, if you're thinking about making the switch, just do it. You won't regret it.",
                                1);
                createDummyPost(user1, "Esports: Why Watching Gaming Tournaments is My New Favorite Sport",
                                "Who needs traditional sports when you've got esports? Watching these gaming tournaments has become my new obsession. The skill level is insane, and the energy at these events? Electrifying. Following teams and players, learning strategies, it's like any other sport but with our favorite games. Whether it's 'Overwatch', 'CS:GO'",
                                0);

                createDummyPost(user1, "The World of Augmented Reality Apps: More Than Just Games",
                                "I've been exploring augmented reality (AR) apps, and it's not just about gaming. From interior design apps that let you visualize furniture in your room to educational apps that bring history to life, AR is super versatile. It's amazing how it blends the digital and real world, creating a whole new experience. If you haven't tried AR apps beyond games, you're missing out on some cool tech.",
                                5);
                createDummyPost(user1, "Mobile Gaming: Why I'm Obsessed & You Should Be Too",
                                "Let's talk about mobile gaming. I know, I know, it doesn’t get the same respect as console or PC gaming, but hear me out. Mobile games have seriously upped their game. I'm not just talking about crushing candies or flinging birds, there's some seriously cool stuff out there now. The convenience? Unbeatable. Stuck in a long line or on a boring bus ride? Boom, your phone's there to rescue you with a quick gaming session. Plus, the graphics on some of these games are getting insanely good. And multiplayer mobile games? Total game changer. I've made friends from around the world just by teaming up in these games. So, if you've been sleeping on mobile gaming, it's time to wake up and download some of these gems. Trust me, you won't regret it!",
                                0);

                UserProfileModel user2 = new UserProfileModel();
                user2.setFollowers(new ArrayList<>());
                user2.setFirstName("Roman");
                user2.setLastName("Ortiz");
                user2.setDob("14JAN1995");
                user2.setEmail("RomanStephan@hotmail.com");
                user2.setUsername("TacoRoman");
                user2.setPassword("password123");
                user2.setThemeColorPref(7);
                user2.setBio(
                                "Hi, I'm Roman, a curious 15-year-old adventurer! I absolutely love crafting my own adventures in Roblox and Minecraft. Building amazing worlds and creating cool games make me super happy. When I'm not exploring virtual realms, you'll find me in the backyard, imagining exciting new quests and dreaming up incredible stories with my toys. Let the adventures never end!");
                user2.setSetupDescription(
                                "High-performance gaming rig featuring powerful GPU, multi-core CPU, ample RAM, fast SSD storage, RGB lighting, liquid cooling, and high-refresh-rate monitor.");
                UserProfileModel follower1 = createDummyFollower("John", "Doe", "john_doe");
                UserProfileModel follower2 = createDummyFollower("Jane", "Doe", "jane_doe");
                UserProfileModel follower3 = createDummyFollower("Alice", "Smith", "alice_smith");

                user2.getFollowers().add(follower1);
                user2.getFollowers().add(follower2);
                user2.getFollowers().add(follower3);

                userProfileRepository.save(user2);
                createDummyPost(user2, "How 'Animal Crossing' Became My Unexpected Stress Relief",
                                "Ever thought a game about running an island could be the ultimate chill pill? 'Animal Crossing' has been my go-to for when life gets too hectic. It's all about creating your own little world, where the biggest worry is which fruit to plant or which wallpaper to pick for your house. The characters are adorable, and there's something super calming about just fishing or catching butterflies. Plus, visiting friends' islands? Best virtual hangout ever. Seriously, if you're looking for a game that's more zen garden than battleground, 'Animal Crossing' is it.",
                                0);

                createDummyPost(user2, "Why I Can't Stop Playing 'Among Us': The Fun of Being Sneaky",
                                "Okay, 'Among Us' has officially taken over my life. There's something wickedly fun about trying to be the sneakiest impostor, or playing detective when you're a crewmate. The best part? The hilarious debates and accusations with friends. It's like a virtual game of 'who dunnit', and I can't get enough of it. Every round is unpredictable, and trying to keep a straight face while sabotaging the ship is the best kind of challenge.",
                                0);

                createDummyPost(user2, "Why I'm Obsessed with Mechanical Keyboards",
                                "Okay, so I might have a slight obsession with mechanical keyboards. The clicky sounds, the customizable keys, the way it feels when you type – it's like typing nirvana. I've even started collecting different keycap sets (don't judge). But seriously, once you try a mechanical keyboard, there's no going back. It's not just about typing; it's about an experience. Plus, they look super cool on your desk.",
                                1);

                createDummyPost(user2, "Why I Can't Get Enough of Open Source Software",
                                "Open source software is my latest obsession. There’s something awesome about using software that’s built and maintained by a community. It's like this big, collaborative project where everyone chips in. Plus, it’s free, and who doesn’t love free stuff? I've been dabbling with different programs, from graphic design to coding tools. The cool part is, you can even contribute to these projects. Open source for the win!",
                                2);

                createDummyPost(user2, "Building My First App: More Fun and Frustration Than I Expected",
                                "Decided to build my first app, and let me tell you, it's been a rollercoaster. One minute, I feel like a tech genius, and the next, I'm totally lost in code. But, even with the ups and downs, it's super rewarding. Seeing something I created actually work (well, most of the time) is the coolest feeling. Can't wait to finish it and show it off. To anyone thinking about trying app development – go for it, it's a wild ride!",
                                2);

                UserProfileModel user3 = new UserProfileModel();
                user3.setFollowers(new ArrayList<>());
                user3.setFirstName("Francisco");
                user3.setLastName("Alvarado");
                user3.setDob("10/31/1997");
                user3.setEmail("FranAlva@gmail.com");
                user3.setUsername("FranAlva");
                user3.setPassword("password123");
                user3.setThemeColorPref(2);
                user3.setBio(
                                "Hi there! I'm Francisco, a computer science student with a passion for video games and technology. When I'm not deep in my studies, I love diving into the world of gaming, exploring everything from the latest RPGs to classic strategy games. I find joy in both the challenge and the escape that these games provide. Outside of gaming, you'll often find me working on coding projects or brainstorming the next big tech idea. I'm always eager to learn and grow in the ever-evolving field of computer science. Whether I'm developing new skills or battling it out in a virtual world, every day is a new adventure!");
                user3.setSetupDescription(
                                "I Dive into my gaming experiences with this rig, powered by an Nvidia GeForce RTX 3080 Ti GPU and an Intel Core i9-11900K CPU. It's equipped with 32GB DDR4 RAM and a 1TB NVMe SSD, ensuring lightning-fast load times and smooth performance. The setup includes a sophisticated liquid cooling system and a visually striking case with customizable RGB lighting. All of this is showcased on a 27-inch 4K monitor with a 144Hz refresh rate, delivering ultra-clear and fluid visuals for an immersive gaming experience.");
                UserProfileModel follower7 = createDummyFollower("John", "Doe", "john_doe");
                UserProfileModel follower8 = createDummyFollower("Jane", "Doe", "jane_doe");
                UserProfileModel follower9 = createDummyFollower("Alice", "Smith", "alice_smith");

                user3.getFollowers().add(follower7);
                user3.getFollowers().add(follower8);
                user3.getFollowers().add(follower9);

                userProfileRepository.save(user3);

                createDummyPost(user3, "The Social Side of Gaming: How 'Fortnite' Became My Virtual Hangout Spot",
                                "Sure, 'Fortnite' is all about survival, but for me, it's become the coolest virtual hangout. Teaming up with friends, goofing around, and yes, even doing those ridiculous dances together – it's how we stay connected. The constant updates and new seasons keep things fresh, and I love how it's more than just a battle royale; it's a social space where we can just have fun and be ourselves, even if it's just as avatars.",
                                0);

                createDummyPost(user3, "Indie Gems: Why 'Stardew Valley' is the Most Addictive Game I've Played",
                                "If you haven't played 'Stardew Valley' yet, you're missing out. It's this indie game where you run a farm, but it's so much more than that. There's this whole community of characters with their stories, mining adventures, even a bit of romance. I've spent hours planting crops, raising animals, and exploring the town. It's one of those games that's easy to learn but has layers of depth that keep you coming back for more.",
                                0);

                createDummyPost(user3, "Getting Hooked on Linux: Why I Made the Switch",
                                "I finally took the plunge and switched to Linux, and guess what? I don't think I'm going back. It's like unlocking a secret level in a game, where you have more control and fewer restrictions. Customizing my desktop has become my new hobby. And the community support is fantastic – there’s always someone ready to help with any issues. If you're on the fence about trying Linux, I say give it a shot. It's a whole new world of computing.",
                                2);

                createDummyPost(user3, "The Magic of Machine Learning: It's Like Teaching a Robot Brain!",
                                "Okay, so I've started dabbling in machine learning, and it's mind-blowing. It's like teaching a computer to think and learn on its own. I'm just scratching the surface, but the possibilities seem endless. From recognizing speech to predicting trends, it's like stepping into the future. Sure, it's a bit daunting at first, but once you get the hang of it, it's incredibly fascinating. Machine learning is definitely a game-changer.",
                                2);
                createDummyPost(user3, "How Wireless Charging Blew My Mind: The Future Is Cord-Free!",
                                "Guys, wireless charging is like magic. Just plop your phone on a pad, and bam, it's charging – no cords, no fuss! I got myself a wireless charger, and it's a game changer. No more fumbling with cables or worrying about finding the right plug. Plus, it looks super sleek on my desk. It's not super fast, but the convenience is worth it. Welcome to the future, where cords are so yesterday.",
                                3);

                createDummyPost(user3, "Virtual Reality: My Mind-Bending Experience with the VR Headset",
                                "I finally tried a VR headset at my friend's place, and wow, it's like stepping into another dimension! The games are insanely immersive. You're not just playing; you're IN the game. I tried a rollercoaster simulation and literally felt my stomach drop. It's crazy how real it feels. VR's not just for gaming though – I watched a concert and it felt like I was actually there. VR is seriously the coolest tech out there right now.",
                                3);

                UserProfileModel user4 = new UserProfileModel();
                user4.setFollowers(new ArrayList<>());
                user4.setFirstName("Daniel");
                user4.setLastName("Soto");
                user4.setDob("10/31/1997");
                user4.setEmail("DSoto@gmail.com");
                user4.setUsername("Dan_Soto");
                user4.setPassword("password123");
                user4.setThemeColorPref(5);
                user4.setBio(
                                "Hi there! I'm Daniel, a devoted enthusiast of technology and an avid gamer at heart. My days are often split between pursuing my studies in computer science and immersing myself in the vast universe of video games. From gripping RPG adventures to strategic brain teasers, gaming is my way of unwinding and challenging myself in exciting new worlds. Beyond gaming, I'm deeply involved in software development, constantly experimenting with new programming projects and innovative tech concepts. Whether I'm coding the next interesting application or navigating through digital landscapes, each day is a thrilling journey filled with learning and discovery!");
                user4.setSetupDescription(
                                "I'm fully immersed in the gaming world with my high-end setup, driven by the mighty Nvidia GeForce RTX 3080 Ti GPU and the robust Intel Core i9-11900K CPU. This powerhouse is fortified with 32GB of DDR4 RAM, providing seamless multitasking and gaming sessions, along with a 1TB NVMe SSD for ultra-quick game loads and efficient system operations. The rig stays cool and efficient thanks to a top-tier liquid cooling system, all encased in a sleek chassis boasting vibrant, customizable RGB lighting that adds flair to my gaming zone. Completing the experience is a 27-inch 4K monitor with a swift 144Hz refresh rate, ensuring every frame is displayed in crisp, life-like detail, making my gaming encounters exceptionally immersive.");
                UserProfileModel follower10 = createDummyFollower("John", "Doe", "john_doe");
                UserProfileModel follower111 = createDummyFollower("Jane", "Doe", "jane_doe");
                UserProfileModel follower12 = createDummyFollower("Alice", "Smith", "alice_smith");

                user4.getFollowers().add(follower10);
                user4.getFollowers().add(follower111);
                user4.getFollowers().add(follower12);

                userProfileRepository.save(user4);

                createDummyPost(user4, "Why I Love Cloud Computing: Access Your Stuff Anywhere!",
                                "Cloud computing has changed the game for me. The idea that I can access my files and work on projects from any device, anywhere, is just awesome. It's like having a supercomputer in your pocket. I've been using various cloud services for storage, app development, and even playing around with some cloud-based AI tools. The convenience and flexibility it offers, especially for someone always on the go, is unbeatable. If you haven't jumped on the cloud bandwagon yet, you're missing out!",
                                2);

                createDummyPost(user4, "My First Dive into Python: It's Not a Snake, But It's Just as Cool!",
                                "So, I just started learning Python, and honestly, I'm loving it. It's like this whole new language that's way easier to get than I thought. I’ve been playing around with simple projects, like a calculator and a basic game. The best part? There's a ton of resources online, so whenever I'm stuck, help is just a click away. Python's great for beginners, and I'm psyched to see where this coding journey takes me!",
                                2);

                createDummyPost(user4, "3D Printing: From Digital to Physical, It's Like Sci-Fi!",
                                "3D printing is like having a mini factory at home. I watched a friend print a phone case, and it's mind-boggling seeing a digital design become a physical object. The possibilities are endless – from toys to tools, even clothes. It's a bit slow and the printers aren't cheap, but it feels like you're in a sci-fi movie. I'm already saving up to get my own!",
                                3);

                createDummyPost(user4, "Smart Home Gadgets: Living in the Future is Pretty Cool",
                                "I've been decking out my place with smart home gadgets, and it's like living in a futuristic movie. Smart lights that change colors with my mood, a thermostat I can control from my phone, and a voice assistant that answers all my weird questions. It's super convenient and kind of fun setting up routines and automations. Sometimes it feels like I'm talking to my house, and it listens! Smart homes are the future, and I'm here for it.",
                                3);

                createDummyPost(user4, "Joining a Coding Bootcamp: Best Decision Ever!",
                                "So, I took the plunge and joined a coding bootcamp. Guys, it's intense but awesome. I'm learning more in weeks than I did in months on my own. The community is super supportive, and we're all in this coding struggle together. We have late-night coding sessions, and even though it's tough, there's a real sense of achievement. If you're on the fence about joining one, I say go for it!",
                                4);

                createDummyPost(user4, "My First Hackathon Experience: 48 Hours of Pure Tech Madness",
                                "Just survived my first hackathon and wow, what a ride! It was 48 hours of coding, problem-solving, and energy drinks. Met some amazing folks – the creativity and skill level were through the roof. We didn't win, but I learned so much and had a blast. If you're into tech and haven't done a hackathon yet, you're missing out. It's exhausting but totally worth it!",
                                4);

                UserProfileModel user5 = new UserProfileModel();
                user5.setFollowers(new ArrayList<>());
                user5.setFirstName("Arlen");
                user5.setLastName("Jackson");
                user5.setDob("10/31/1997");
                user5.setEmail("Arlenj@gmail.com");
                user5.setUsername("Ajacks101");
                user5.setPassword("password123");
                user5.setThemeColorPref(6);
                user5.setBio(
                                "Hello! I'm Arlen Jackson, a tech enthusiast and a dedicated gamer. My life revolves around balancing my computer science studies with my love for video games. I find myself deeply engrossed in everything from immersive RPGs to thought-provoking strategy games, using them as a fun escape and a mental challenge. Away from gaming, I'm passionately involved in software development, always keen on tinkering with new coding projects and exploring groundbreaking technological ideas. My drive is fueled by a desire to stay ahead in the ever-changing tech landscape, constantly refining my skills and knowledge.");
                user5.setSetupDescription(
                                "I'm deeply engaged in my gaming adventures with a top-notch setup, anchored by the formidable Nvidia GeForce RTX 3080 Ti GPU and the powerful Intel Core i9-11900K CPU. This beast of a machine is equipped with 32GB DDR4 RAM, ensuring fluid gameplay and efficient multitasking, paired with a lightning-fast 1TB NVMe SSD for quick game loading and optimal system performance. Keeping everything running at peak efficiency is a state-of-the-art liquid cooling system, all housed within an eye-catching case adorned with dynamic, customizable RGB lighting that enhances the aesthetic of my gaming environment. The centerpiece is a stunning 27-inch 4K monitor with a rapid 144Hz refresh rate, rendering every scene with crystal-clear clarity and smoothness, for a truly enveloping gaming experience.");
                UserProfileModel follower22 = createDummyFollower("John", "Doe", "john_doe");
                UserProfileModel follower23 = createDummyFollower("Jane", "Doe", "jane_doe");
                UserProfileModel follower24 = createDummyFollower("Alice", "Smith", "alice_smith");

                user5.getFollowers().add(follower22);
                user5.getFollowers().add(follower23);
                user5.getFollowers().add(follower24);

                userProfileRepository.save(user5);

                createDummyPost(user5, "Augmented Reality: How AR Apps are Changing My World",
                                "Augmented reality (AR) isn't just for Pokémon GO. I've been exploring AR apps, and they're changing how I interact with the world. From trying on clothes virtually to seeing how furniture looks in my room before I buy it, AR is super useful. It's like adding a layer of magic to the real world. I even used an AR app to learn about constellations in the night sky. AR is still growing, but it's already pretty awesome.",
                                3);

                createDummyPost(user5, "Electric Cars: My Test Drive in the Future of Transportation",
                                "I test drove an electric car last weekend, and it was like driving a spaceship. The acceleration is instant – it's like being in a rollercoaster. No engine noise, just smooth, clean driving. Plus, knowing I'm not polluting while driving feels great. The tech inside is like something out of a sci-fi movie, with screens and gadgets everywhere. Charging can be a hassle compared to gas, but the cool factor makes up for it. Electric cars are definitely the way of the future.",
                                3);

                createDummyPost(user5, "Why Tech Meetups Are My New Favorite Thing",
                                "Started attending local tech meetups and, honestly, I'm hooked. It's incredible to connect with people who speak your geek language. We talk about the latest tech trends, share project ideas, and sometimes just nerd out. It's great for networking, learning, or just finding your tribe. Highly recommend checking one out if you're into tech and want to meet like-minded folks.",
                                4);

                createDummyPost(user5, "Diving Into Open Source Projects: It's Like Joining a Tech Revolution",
                                "I recently got into contributing to open source projects, and it's like being part of a tech revolution. It's not just about coding; it's about collaboration and making something cool together. The community is super welcoming and appreciative of any contribution, no matter how small. Plus, I'm learning a ton and improving my coding skills. If you're thinking about it, dive in – it's rewarding!",
                                4);
                createDummyPost(user5, "Why I Ditched My Car for an E-Scooter and Loving It!",
                                "Okay, so I recently swapped my car for an e-scooter, and it's been amazing. Zipping through traffic, no parking hassles, and it's eco-friendly! Plus, the thrill of the ride is way better than being stuck in a car. Charging is a breeze, and it's surprisingly fast. If you're thinking about an alternative way to get around the city, e-scooters are the way to go. Trust me, it's a game-changer!",
                                5);

                createDummyPost(user5, "Smart Mirrors: How I Upgraded My Morning Routine",
                                "Ever heard of smart mirrors? I installed one in my bathroom, and mornings have never been the same. It shows the weather, news, and even my calendar while I'm brushing my teeth. It's like something out of a sci-fi movie! It's not just a mirror; it's like my personal assistant now. If you love tech and want to spice up your daily routine, you need to check these out.",
                                5);

                UserProfileModel user6 = new UserProfileModel();
                user6.setFollowers(new ArrayList<>());
                user6.setFirstName("Kyle");
                user6.setLastName("Rogers");
                user6.setDob("10/31/1997");
                user6.setEmail("kyleRogers@gmail.com");
                user6.setUsername("KyleRogers");
                user6.setPassword("password123");
                user6.setThemeColorPref(0);
                user6.setBio(
                                "Hello! I'm Kyle Rogers, a fervent admirer of technology and a zealous video game player. My daily routine is a blend of delving into my computer science studies and indulging in the vast universe of video games. I find immense satisfaction in a range of games, from captivating RPGs to intellectually stimulating strategy games, which serve as both an enjoyable pastime and a mental exercise. Beyond the realm of gaming, I'm actively engaged in software development, constantly experimenting with new programming projects and delving into innovative tech advancements. My motivation is driven by the aspiration to remain at the forefront of the rapidly evolving technological world, continually honing my skills and expanding my knowledge. Whether it's crafting cutting-edge software or navigating through the enchanting landscapes of games, each day is filled with opportunities for personal growth, learning, and pushing the boundaries of what's possible in technology.");
                user6.setSetupDescription(
                                "My gaming setup is a true powerhouse, centered around the impressive Nvidia GeForce RTX 3080 Ti GPU and the high-performance Intel Core i9-11900K CPU. This rig is a gamer's dream, packed with 32GB of DDR4 RAM for seamless gameplay and multitasking, complemented by a super-fast 1TB NVMe SSD for instant game launches and top-notch system efficiency. To keep it all cool and running smoothly, there's an advanced liquid cooling system in place. The setup is encased in a striking chassis, featuring vibrant and customizable RGB lighting that really sets the mood for my gaming sessions. The showstopper is a brilliant 27-inch 4K monitor with a swift 144Hz refresh rate, ensuring each image is rendered in vivid, fluid detail, making every gaming moment immersive and lifelike.");
                UserProfileModel follower33 = createDummyFollower("John", "Doe", "john_doe");
                UserProfileModel follower34 = createDummyFollower("Jane", "Doe", "jane_doe");
                UserProfileModel follower35 = createDummyFollower("Alice", "Smith", "alice_smith");

                user6.getFollowers().add(follower33);
                user6.getFollowers().add(follower34);
                user6.getFollowers().add(follower35);

                userProfileRepository.save(user6);

                createDummyPost(user6, "Tech Podcasts: My Daily Dose of Geekdom",
                                "Lately, I've gotten super into tech podcasts. They're like a daily dose of geekdom. Whether I'm commuting or just chilling, I love catching up on the latest tech news, trends, and debates. Some of these hosts are hilarious and super knowledgeable. If you're into tech and looking for something to listen to, podcasts are the way to go. They're entertaining and you learn stuff without even trying!",
                                4);

                createDummyPost(user6, "My Experience with Wireless Earbuds: No Strings Attached!",
                                "Finally jumped on the wireless earbud bandwagon, and I'm not looking back. No more tangled wires or yanking my phone off the table. The sound quality is awesome, and they're so light I barely feel them. Plus, taking calls hands-free is a total win. If you're still using wired earphones, it's time to cut the cord and go wireless. It's a small change, but it makes a big difference.",
                                5);

                createDummyPost(user6, "How a Fitness Tracker Changed My Health Game",
                                "Got myself a fitness tracker, and it's like having a personal trainer on my wrist. It tracks my steps, sleep, heart rate, and even reminds me to move when I've been sitting too long. Seeing my activity data motivates me to stay active and make healthier choices. Plus, competing with friends on step counts is fun. If you're looking to get a bit more active, a fitness tracker is a great start.",
                                5);

                createDummyPost(user6, "Gaming PCs: Building My Dream Rig Was Easier Than I Thought!",
                                "Building my own gaming PC sounded like rocket science, but it was surprisingly doable! Picking out the parts was like adult Legos – kinda fun figuring out what works best together. And when I powered it up for the first time? Mind blown. The speed, the graphics – it's like I'm playing a whole new set of games. If you're on the fence about building your own PC, I say go for it. It's a rewarding project that pays off big time in your gaming experience.",
                                1);
                createDummyPost(user6, "The Magic of RPGs: Why 'Skyrim' Keeps Pulling Me Back In",
                                "RPGs have always been my thing, but 'Skyrim'? That's next level. I've lost count of how many hours I've spent exploring every nook and cranny of that world. The freedom to choose your path, the epic quests, the dragons - it's like living in your own fantasy novel. And mods? They're like the cherry on top, making each playthrough feel new and exciting. 'Skyrim' isn't just a game; it's a whole other life waiting to be lived.",
                                0);

                createDummyPost(user6, "Smartwatches: Gimmick or Game-Changer? My Two Cents",
                                "I always thought smartwatches were just a fancy gimmick. But then I got one as a gift, and now? I'm hooked. It's like having a mini-phone on my wrist. Checking messages without pulling out my phone, tracking my steps, even paying for coffee – it's all there on my wrist. And the health features? Total game-changer. It's kind of amazing how this tiny gadget can do so much. I'm officially a smartwatch convert.",
                                1);

        }

}

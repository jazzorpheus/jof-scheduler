export const events = [
  {
    id: "2025-jofball-tournament",
    title: "2025 JoFBall Tournament",
    description:
      "The tournament will be a multi-day tournament. Spread out over the course of a few weeks. Matches will be organised to fit the players' schedules. No preset day of the week nor preset hour of day. Teams are made up of 4 players, but matches are played 3v3. If your team has less-available players, forming a team of 5 may be possible. The teams are self-formed, you may sign up together with your friends as a prepared team. If you do not have a team, show your playing intent in this topic and you will find a team. The tournament is planned with 32 players in mind, but that is not set in stone whatsoever. The bracket will be adjusted to fit any amount of teams depending on how many sign up. The tournament format will be swiss -> double elimination. Everyone will play at least 5 matches.",
    type: "multi-team", // "multi-team" or "1v1"
    startDate: "2026-03-15",
    endDate: "2026-04-15",
    numTeams: 8, // 2-15
    playersPerTeam: 4, // 2-15
    numParticipants: 32, // 1-100
    location: "Events Server", // "Public Server", "Temple Server", "Events Server"
    createdAt: "2026-02-08T12:00:00Z",
    updatedAt: "2026-02-08T12:00:00Z",
    status: "upcoming", // "upcoming", "in progress", "completed", "cancelled",
    teams: {
      team_flaggots: ["Akr", "Dantee", "Tony", "Last Samurai"],
      team_jediman: ["Xaimm", "DiLara", "Kneecap", "Splat"],
      team_idontgiveaflagidgaf: ["vinry", "Dory", "JustNeilone", "Venom"],
      team_rotkindlessteam: ["KypDurron", "Blashyrkh", "mick", "face"],
      team_theflagevarines: ["SeveN", "Perso", "Joe", "Heards"],
      team_jerkingonflags: ["cLix", "Jacobo", "Daerskinar", "Gnost"],
      team_flag: ["KeN dARK", "BBadger", "Toxiee", "gardfild"],
      team_opcm: ["onnion", "PhreaKy", "caex", "Martin"],
    },
  },
  {
    id: "ctf-tournament-2026-round-robin",
    title: "CTF Tournament 2026: Round Robin",
    description:
      "The first round of JoF's annual Capture the Flag Tournament. You have one month to play every other team registered in the tourny. Please bear in mind that finding a time in which all players across two teams are available to play can be quite a challenge in itself, so please be patient and willing to put some effort into the process! The first step is to select ANY and ALL timeslots where there is at least a medium-high probability that you will be able to make it. Organization involving regular communication between team players and effective forward planning are key. Good luck!",
    type: "multi-team", // "multi-team" or "1v1"
    startDate: "2026-10-18",
    endDate: "2026-11-18",
    numTeams: 10, // 2-15
    playersPerTeam: 4, // 2-15
    numParticipants: 40, // 1-100
    location: "Events Server", // "Public Server", "Temple Server", "Events Server"
    createdAt: "2026-02-08T12:00:00Z",
    updatedAt: "2026-02-08T12:00:00Z",
    status: "upcoming", // "upcoming", "in progress", "completed", "cancelled",
    teams: {
      team_flaggots: ["Akr", "Dantee", "Tony", "Last Samurai"],
      team_jediman: ["Xaimm", "DiLara", "Kneecap", "Splat"],
      team_idontgiveaflagidgaf: ["vinry", "Dory", "JustNeilone", "Venom"],
      team_rotkindlessteam: ["KypDurron", "Blashyrkh", "mick", "face"],
      team_theflagevarines: ["SeveN", "Perso", "Joe", "Heards"],
      team_jerkingonflags: ["cLix", "Jacobo", "Daerskinar", "Gnost"],
      team_flag: ["KeN dARK", "BBadger", "Toxiee", "gardfild"],
      team_opcm: ["onnion", "PhreaKy", "caex", "Martin"],
      team_creyonstinyfriends: ["Creyon", "Ruxith", "SheRiff", "Rain"],
      team_jimmytherentboys: ["jazz", "Jericho", "Quickster", "Sunny"],
    },
  },
];

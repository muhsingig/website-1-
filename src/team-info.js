// Accurate per-team detail for the Teams page click-through.
// Sources: FIFA, Wikipedia. Appearances + FIFA rank come from teamMeta; coach
// + squad come from squads-data; 2026 matches come from fixtures. This file
// adds confederation, best World Cup result, honours, a short bio, a few
// "did you know" facts and historic moments. Facts kept conservative/verifiable.
// Keys match the team names used in wc-data.js exactly.

export const teamInfo = {
  // ---------------- Group A ----------------
  'Mexico': {
    conf: 'CONCACAF', best: 'Quarter-finals (1970, 1986)',
    titles: ['Confederations Cup 1999', 'CONCACAF Gold Cup ×12'],
    bio: 'Co-hosts and CONCACAF\'s most consistent side, at a record 18th World Cup and playing the opener at the Estadio Azteca.',
    facts: [
      'The Estadio Azteca becomes the first stadium to host matches at three different World Cups (1970, 1986, 2026).',
      'Mexico have reached the knockout stage a record seven tournaments in a row (1994–2018).',
    ],
    moments: [
      { year: '1970', text: 'Hosted a classic World Cup and reached the quarter-finals for the first time.' },
      { year: '1986', text: 'Hosted again and matched their best run to the last eight.' },
      { year: '1999', text: 'Beat Brazil 4–3 to win the Confederations Cup on home soil.' },
    ],
  },
  'South Africa': {
    conf: 'CAF', best: 'Group stage',
    titles: ['Africa Cup of Nations 1996'],
    bio: 'Africa Cup of Nations winners on debut as a host, back at the World Cup for the first time since they staged it in 2010.',
    facts: [
      'In 2010 they became the first host nation to be eliminated in the group stage.',
      'Won the 1996 Africa Cup of Nations the first time they entered after readmission.',
    ],
    moments: [
      { year: '1996', text: 'Lifted the Africa Cup of Nations as hosts, Nelson Mandela presenting the trophy.' },
      { year: '2010', text: 'Hosted the first World Cup on African soil; Siphiwe Tshabalala\'s opener is iconic.' },
    ],
  },
  'Korea Republic': {
    conf: 'AFC', best: 'Fourth place (2002)',
    titles: ['AFC Asian Cup 1956, 1960'],
    bio: 'Asia\'s most regular World Cup presence, qualifying for an 11th finals and a 10th in a row.',
    facts: [
      'As co-hosts in 2002 they became the first — and still only — Asian side to reach the semi-finals.',
      'Son Heung-min leads a generation chasing a first knockout run since 2010.',
    ],
    moments: [
      { year: '2002', text: 'Stunned Italy and Spain en route to a historic fourth-place finish as co-hosts.' },
      { year: '2018', text: 'Beat reigning champions Germany 2–0 to knock them out in the group stage.' },
    ],
  },
  'Czechia': {
    conf: 'UEFA', best: 'Runners-up (1934, 1962, as Czechoslovakia)',
    titles: ['European Championship 1976 (as Czechoslovakia)'],
    bio: 'Successors to Czechoslovakia\'s two World Cup finals, back at the finals for the first time since 2006.',
    facts: [
      'As Czechoslovakia they reached the World Cup final twice and won Euro 1976 on penalties.',
      'The 1976 Euro final featured Antonín Panenka\'s famous chipped penalty.',
    ],
    moments: [
      { year: '1976', text: 'Czechoslovakia beat West Germany on penalties to win the European Championship.' },
      { year: '2004', text: 'A golden generation reached the Euro semi-finals playing thrilling football.' },
    ],
  },
  // ---------------- Group B ----------------
  'Canada': {
    conf: 'CONCACAF', best: 'Group stage',
    titles: ['CONCACAF Gold Cup 2000'],
    bio: 'Co-hosts enjoying a golden era, appearing at back-to-back World Cups for the first time.',
    facts: [
      'Alphonso Davies and Jonathan David lead the most talented squad in Canadian history.',
      'Their 2022 appearance ended a 36-year World Cup absence.',
    ],
    moments: [
      { year: '2000', text: 'Won the CONCACAF Gold Cup, their biggest senior trophy.' },
      { year: '2022', text: 'Returned to the World Cup after 36 years; Davies scored their first-ever finals goal.' },
    ],
  },
  'Bosnia and Herzegovina': {
    conf: 'UEFA', best: 'Group stage',
    titles: [],
    bio: 'Back at a major tournament for the second time, chasing a first knockout appearance.',
    facts: [
      'Their only previous World Cup was 2014, where Edin Džeko and company narrowly went out in the group.',
      'Independent since the 1990s, they qualified for their first major finals in 2014.',
    ],
    moments: [
      { year: '2014', text: 'Made their World Cup debut in Brazil and beat Iran for a first finals win.' },
    ],
  },
  'Qatar': {
    conf: 'AFC', best: 'Group stage',
    titles: ['AFC Asian Cup 2019, 2023'],
    bio: 'Back-to-back Asian champions making their first World Cup appearance via qualification rather than hosting.',
    facts: [
      'In 2022 they were the first host nation ever to lose their opening match.',
      'They won the 2019 and 2023 Asian Cups, the second on home soil.',
    ],
    moments: [
      { year: '2019', text: 'Won a first Asian Cup, beating Japan in the final.' },
      { year: '2022', text: 'Hosted the World Cup for the first time in the Middle East.' },
    ],
  },
  'Switzerland': {
    conf: 'UEFA', best: 'Quarter-finals (1934, 1938, 1954)',
    titles: [],
    bio: 'Reliable tournament qualifiers known for organisation, reaching a fifth straight World Cup.',
    facts: [
      'They have reached the knockout stage at four of the last five World Cups.',
      'In 2021 they knocked out world champions France on penalties at the Euros.',
    ],
    moments: [
      { year: '1954', text: 'As hosts they played in the highest-scoring World Cup match ever, a 7–5 loss to Austria.' },
      { year: '2021', text: 'Eliminated France in a dramatic Euro 2020 round-of-16 shootout.' },
    ],
  },
  // ---------------- Group C ----------------
  'Brazil': {
    conf: 'CONMEBOL', best: 'Champions (1958, 1962, 1970, 1994, 2002)',
    titles: ['World Cup ×5', 'Copa América ×9', 'Confederations Cup ×4'],
    bio: 'The most successful nation in World Cup history and the only side to play every edition.',
    facts: [
      'Brazil are record five-time world champions and have never missed a World Cup.',
      'Pelé is the only player to win three World Cups (1958, 1962, 1970).',
    ],
    moments: [
      { year: '1970', text: 'The Pelé-led side is often called the greatest team ever after winning in Mexico.' },
      { year: '2002', text: 'Ronaldo scored eight goals as Brazil won a record fifth title.' },
    ],
  },
  'Morocco': {
    conf: 'CAF', best: 'Fourth place (2022)',
    titles: ['Africa Cup of Nations 1976'],
    bio: 'Africa\'s history-makers after a stunning run in 2022, now among the continent\'s elite.',
    facts: [
      'In 2022 they became the first African and first Arab nation to reach a World Cup semi-final.',
      'They knocked out Spain and Portugal on the way to the last four.',
    ],
    moments: [
      { year: '1986', text: 'First African team to top a World Cup group and reach the knockout round.' },
      { year: '2022', text: 'Beat Portugal to reach a historic semi-final, finishing fourth.' },
    ],
  },
  'Haiti': {
    conf: 'CONCACAF', best: 'Group stage',
    titles: [],
    bio: 'A rare World Cup return for the Caribbean side, back for the first time since 1974.',
    facts: [
      'Their only previous World Cup was 1974 in West Germany.',
      'Emmanuel Sanon famously scored against the great Italy goalkeeper Dino Zoff in 1974.',
    ],
    moments: [
      { year: '1974', text: 'On their debut, Sanon ended Dino Zoff\'s record shutout streak.' },
    ],
  },
  'Scotland': {
    conf: 'UEFA', best: 'Group stage',
    titles: [],
    bio: 'Football\'s pioneers returning to the World Cup for the first time since 1998.',
    facts: [
      'Scotland have appeared at eight World Cups but never advanced past the group stage.',
      'They contested the very first official international match, against England in 1872.',
    ],
    moments: [
      { year: '1978', text: 'Archie Gemmill\'s solo goal against the Netherlands is among the World Cup\'s most famous.' },
    ],
  },
  // ---------------- Group D ----------------
  'United States': {
    conf: 'CONCACAF', best: 'Third place (1930)',
    titles: ['CONCACAF Gold Cup ×7'],
    bio: 'Co-hosts with a young, Europe-based generation aiming for a deep run on home soil.',
    facts: [
      'They finished third at the very first World Cup in 1930.',
      'They shocked England 1–0 in 1950 in one of the greatest World Cup upsets.',
    ],
    moments: [
      { year: '1950', text: 'Beat England 1–0 in Belo Horizonte in a legendary upset.' },
      { year: '2002', text: 'Reached the quarter-finals, their best modern finish.' },
    ],
  },
  'Paraguay': {
    conf: 'CONMEBOL', best: 'Quarter-finals (2010)',
    titles: ['Copa América 1953, 1979'],
    bio: 'Gritty South American side back at the World Cup after missing the last three editions.',
    facts: [
      'Their best run came in 2010, losing the quarter-final narrowly to eventual champions Spain.',
      'They have won the Copa América twice.',
    ],
    moments: [
      { year: '2010', text: 'Reached a first World Cup quarter-final after a shootout win over Japan.' },
    ],
  },
  'Australia': {
    conf: 'AFC', best: 'Round of 16 (2006, 2022)',
    titles: ['AFC Asian Cup 2015', 'OFC Nations Cup ×4'],
    bio: 'The Socceroos, regular qualifiers since switching to Asian confederation, at a sixth straight World Cup.',
    facts: [
      'Asian champions in 2015 on home soil.',
      'They reached the knockout stage in both 2006 and 2022.',
    ],
    moments: [
      { year: '2006', text: 'Reached the last 16 on their first World Cup in 32 years.' },
      { year: '2022', text: 'Beat Denmark and Tunisia to reach the round of 16 again.' },
    ],
  },
  'Türkiye': {
    conf: 'UEFA', best: 'Third place (2002)',
    titles: [],
    bio: 'Back at the World Cup for the first time since their golden run in 2002.',
    facts: [
      'They finished third in 2002, their only deep World Cup run.',
      'Hakan Şükür scored the fastest goal in World Cup history (11 seconds) in 2002.',
    ],
    moments: [
      { year: '2002', text: 'Finished third in Korea/Japan, beating co-hosts South Korea in the play-off.' },
    ],
  },
  // ---------------- Group E ----------------
  'Germany': {
    conf: 'UEFA', best: 'Champions (1954, 1974, 1990, 2014)',
    titles: ['World Cup ×4', 'European Championship ×3', 'Confederations Cup 2017'],
    bio: 'Four-time world champions and one of the sport\'s great powers, chasing redemption after early exits.',
    facts: [
      'Germany have reached a record eight World Cup finals.',
      'Their 7–1 win over hosts Brazil in the 2014 semi-final is one of football\'s most shocking results.',
    ],
    moments: [
      { year: '1954', text: 'The "Miracle of Bern" — beat the great Hungary to win a first world title.' },
      { year: '2014', text: 'Won a fourth star in Brazil, Götze scoring the final winner against Argentina.' },
    ],
  },
  'Curaçao': {
    conf: 'CONCACAF', best: 'Debut (2026)',
    titles: ['Caribbean Cup 2017'],
    bio: 'Tiny Caribbean island making a remarkable first-ever World Cup appearance.',
    facts: [
      'With a population around 150,000, they are among the smallest nations ever to qualify.',
      'Many of their squad have Dutch football roots through the former Netherlands Antilles.',
    ],
    moments: [
      { year: '2026', text: 'Qualified for a first World Cup in their history.' },
    ],
  },
  "Côte d'Ivoire": {
    conf: 'CAF', best: 'Group stage',
    titles: ['Africa Cup of Nations 1992, 2015, 2023'],
    bio: 'Three-time African champions and reigning AFCON winners, back at the World Cup after missing 2018 and 2022.',
    facts: [
      'Won the 2023 Africa Cup of Nations on home soil after a dramatic campaign.',
      'The Drogba-era "golden generation" reached three straight World Cups (2006–2014).',
    ],
    moments: [
      { year: '2023', text: 'Lifted the AFCON title as hosts after nearly being eliminated in the group.' },
    ],
  },
  'Ecuador': {
    conf: 'CONMEBOL', best: 'Round of 16 (2006)',
    titles: [],
    bio: 'Well-drilled Andean side with one of the best defensive records in South American qualifying.',
    facts: [
      'Their best World Cup was 2006, reaching the round of 16.',
      'A very young squad has become a fixture in CONMEBOL\'s top places.',
    ],
    moments: [
      { year: '2006', text: 'Beat Poland and Costa Rica to reach the knockout stage for the first time.' },
    ],
  },
  // ---------------- Group F ----------------
  'Netherlands': {
    conf: 'UEFA', best: 'Runners-up (1974, 1978, 2010)',
    titles: ['European Championship 1988'],
    bio: 'Three-time World Cup finalists famed for "Total Football", still chasing a first world title.',
    facts: [
      'They have lost three World Cup finals — more than any nation to never win it.',
      'Johan Cruyff\'s 1974 side revolutionised football with Total Football.',
    ],
    moments: [
      { year: '1974', text: 'Cruyff\'s Total Football dazzled the world but lost the final to West Germany.' },
      { year: '2010', text: 'Reached a third final, beaten by Spain after extra time.' },
    ],
  },
  'Japan': {
    conf: 'AFC', best: 'Round of 16 (×4)',
    titles: ['AFC Asian Cup 1992, 2000, 2004, 2011'],
    bio: 'Asia\'s record four-time champions, increasingly fearless against the world\'s best.',
    facts: [
      'In 2022 they beat both Germany and Spain to win their group.',
      'They are record four-time AFC Asian Cup winners.',
    ],
    moments: [
      { year: '2022', text: 'Stunned Germany and Spain to top a "group of death".' },
    ],
  },
  'Sweden': {
    conf: 'UEFA', best: 'Runners-up (1958)',
    titles: ['Olympic gold 1948'],
    bio: 'Scandinavian stalwarts back at the World Cup with a new generation after the Ibrahimović era.',
    facts: [
      'As hosts in 1958 they reached the final, losing to Pelé\'s Brazil.',
      'They finished third in both 1950 and 1994.',
    ],
    moments: [
      { year: '1994', text: 'Finished third in the USA, one of their finest tournaments.' },
    ],
  },
  'Tunisia': {
    conf: 'CAF', best: 'Group stage',
    titles: ['Africa Cup of Nations 2004'],
    bio: 'North African regulars who have qualified for several World Cups without yet advancing.',
    facts: [
      'In 1978 they became the first African team to win a World Cup match.',
      'They beat reigning champions France 1–0 in the 2022 group stage.',
    ],
    moments: [
      { year: '1978', text: 'Beat Mexico for Africa\'s first-ever World Cup victory.' },
      { year: '2022', text: 'Defeated holders France, though both went out.' },
    ],
  },
  // ---------------- Group G ----------------
  'Belgium': {
    conf: 'UEFA', best: 'Third place (2018)',
    titles: [],
    bio: 'A "golden generation" that peaked at third in 2018, now rebuilding around new talent.',
    facts: [
      'They topped the FIFA world ranking for a record stretch between 2018 and 2022.',
      'Their third place in 2018 is their best-ever finish.',
    ],
    moments: [
      { year: '2018', text: 'Beat Brazil and Japan en route to a best-ever third place.' },
    ],
  },
  'Egypt': {
    conf: 'CAF', best: 'Group stage',
    titles: ['Africa Cup of Nations ×7'],
    bio: 'Record seven-time African champions led by superstar Mohamed Salah.',
    facts: [
      'They were the first African nation to enter a World Cup, in 1934.',
      'They hold the record with seven Africa Cup of Nations titles.',
    ],
    moments: [
      { year: '1934', text: 'Became the first African and Arab team to play at a World Cup.' },
    ],
  },
  'Iran': {
    conf: 'AFC', best: 'Group stage',
    titles: ['AFC Asian Cup 1968, 1972, 1976'],
    bio: 'One of Asia\'s strongest teams over the past decade, regular qualifiers chasing a first knockout berth.',
    facts: [
      'Three-time Asian champions, all in the 1960s–70s.',
      'They beat the USA 2–1 in a politically charged 1998 World Cup match.',
    ],
    moments: [
      { year: '1998', text: 'Famous 2–1 win over the United States in France.' },
    ],
  },
  'New Zealand': {
    conf: 'OFC', best: 'Group stage',
    titles: ['OFC Nations Cup ×6'],
    bio: 'Oceania\'s dominant side, back at the World Cup for the first time since 2010.',
    facts: [
      'In 2010 they were the only team to finish unbeaten — drawing all three group games.',
      'They are record Oceania champions.',
    ],
    moments: [
      { year: '2010', text: 'Held Italy and went home unbeaten, the only such team in South Africa.' },
    ],
  },
  // ---------------- Group H ----------------
  'Spain': {
    conf: 'UEFA', best: 'Champions (2010)',
    titles: ['World Cup 2010', 'European Championship 1964, 2008, 2012, 2024'],
    bio: 'World and European champions of the tiki-taka era, again among the favourites.',
    facts: [
      'Their 2010 win completed a unique Euro–World Cup–Euro treble.',
      'They won Euro 2024 with a record seven wins from seven.',
    ],
    moments: [
      { year: '2010', text: 'Andrés Iniesta\'s extra-time goal beat the Netherlands for a first world title.' },
    ],
  },
  'Cabo Verde': {
    conf: 'CAF', best: 'Debut (2026)',
    titles: [],
    bio: 'The "Blue Sharks" of a small island nation reaching their first-ever World Cup.',
    facts: [
      'One of the smallest countries by population ever to qualify for a World Cup.',
      'They reached the AFCON quarter-finals in 2013 and 2023.',
    ],
    moments: [
      { year: '2026', text: 'Qualified for a maiden World Cup, a landmark for the islands.' },
    ],
  },
  'Saudi Arabia': {
    conf: 'AFC', best: 'Round of 16 (1994)',
    titles: ['AFC Asian Cup 1984, 1988, 1996'],
    bio: 'Three-time Asian champions and one of the continent\'s most decorated sides.',
    facts: [
      'On their 1994 debut they reached the last 16, Saeed Al-Owairan scoring a wonder goal.',
      'They stunned eventual champions Argentina 2–1 in 2022.',
    ],
    moments: [
      { year: '2022', text: 'Beat Lionel Messi\'s Argentina 2–1 in one of the great World Cup upsets.' },
    ],
  },
  'Uruguay': {
    conf: 'CONMEBOL', best: 'Champions (1930, 1950)',
    titles: ['World Cup 1930, 1950', 'Copa América ×15'],
    bio: 'Two-time world champions and record Copa América winners, huge achievers for a small nation.',
    facts: [
      'They won the first-ever World Cup as hosts in 1930.',
      'Their 1950 "Maracanazo" silenced 200,000 Brazilians in Rio.',
    ],
    moments: [
      { year: '1950', text: 'Beat Brazil at the Maracanã to win the World Cup in stunning fashion.' },
      { year: '2010', text: 'Reached the semi-finals, their best modern run.' },
    ],
  },
  // ---------------- Group I ----------------
  'France': {
    conf: 'UEFA', best: 'Champions (1998, 2018)',
    titles: ['World Cup 1998, 2018', 'European Championship 1984, 2000', 'Nations League 2021'],
    bio: 'Two-time and recent world champions with arguably the deepest talent pool in the game.',
    facts: [
      'They reached back-to-back World Cup finals in 2018 and 2022.',
      'Kylian Mbappé scored a hat-trick in the 2022 final, only the second ever.',
    ],
    moments: [
      { year: '1998', text: 'Won a first World Cup as hosts, Zidane scoring twice in the final.' },
      { year: '2018', text: 'A young side won in Russia, Mbappé announcing himself to the world.' },
    ],
  },
  'Senegal': {
    conf: 'CAF', best: 'Quarter-finals (2002)',
    titles: ['Africa Cup of Nations 2021'],
    bio: 'Reigning-era African champions and a continental powerhouse led by Sadio Mané.',
    facts: [
      'On their 2002 debut they beat holders France and reached the quarter-finals.',
      'They won a first Africa Cup of Nations in 2021.',
    ],
    moments: [
      { year: '2002', text: 'Beat world champions France on debut and stormed to the last eight.' },
    ],
  },
  'Iraq': {
    conf: 'AFC', best: 'Group stage',
    titles: ['AFC Asian Cup 2007'],
    bio: 'Asian champions of 2007 returning to the World Cup for the first time since 1986.',
    facts: [
      'Their 2007 Asian Cup win came amid extraordinary national hardship.',
      'Their only previous World Cup was Mexico 1986.',
    ],
    moments: [
      { year: '2007', text: 'Won the Asian Cup as huge underdogs, uniting the nation.' },
    ],
  },
  'Norway': {
    conf: 'UEFA', best: 'Round of 16 (1998)',
    titles: [],
    bio: 'Back at the World Cup after a long absence, powered by superstars Erling Haaland and Martin Ødegaard.',
    facts: [
      'This is their first World Cup since 1998.',
      'Haaland is among the most prolific strikers in world football.',
    ],
    moments: [
      { year: '1998', text: 'Beat Brazil 2–1 to reach the round of 16 in France.' },
    ],
  },
  // ---------------- Group J ----------------
  'Argentina': {
    conf: 'CONMEBOL', best: 'Champions (1978, 1986, 2022)',
    titles: ['World Cup 1978, 1986, 2022', 'Copa América ×16', 'Confederations Cup 1992'],
    bio: 'Reigning world champions, captained by Lionel Messi in what may be his final World Cup.',
    facts: [
      'Messi could become the first man to play at six different World Cups.',
      'They won three straight major titles: Copa 2021, World Cup 2022, Copa 2024.',
    ],
    moments: [
      { year: '1986', text: 'Diego Maradona dragged Argentina to glory with the "Goal of the Century".' },
      { year: '2022', text: 'Beat France in a classic final on penalties for a third star.' },
    ],
  },
  'Algeria': {
    conf: 'CAF', best: 'Round of 16 (2014)',
    titles: ['Africa Cup of Nations 1990, 2019'],
    bio: 'Two-time African champions back at the World Cup after missing 2018 and 2022.',
    facts: [
      'In 1982 they beat West Germany but went out due to the infamous "Disgrace of Gijón".',
      'They pushed eventual champions Germany to extra time in the 2014 last 16.',
    ],
    moments: [
      { year: '2014', text: 'Reached the knockout stage for the first time and gave Germany a huge scare.' },
    ],
  },
  'Austria': {
    conf: 'UEFA', best: 'Third place (1954)',
    titles: [],
    bio: 'Energetic, well-coached side back among Europe\'s qualifiers under a modern pressing style.',
    facts: [
      'They finished third at the 1954 World Cup, their best result.',
      'The 1930s "Wunderteam" was one of Europe\'s first great sides.',
    ],
    moments: [
      { year: '1954', text: 'Beat hosts Switzerland 7–5 — the highest-scoring World Cup match ever — and finished third.' },
    ],
  },
  'Jordan': {
    conf: 'AFC', best: 'Debut (2026)',
    titles: [],
    bio: 'Asian Cup 2023 runners-up reaching their first-ever World Cup.',
    facts: [
      'They reached the 2023 Asian Cup final, their best-ever result.',
      '2026 is the first World Cup in Jordan\'s history.',
    ],
    moments: [
      { year: '2023', text: 'Reached a first Asian Cup final, beating South Korea in the semis.' },
    ],
  },
  // ---------------- Group K ----------------
  'Portugal': {
    conf: 'UEFA', best: 'Third place (1966)',
    titles: ['European Championship 2016', 'Nations League 2019, 2025'],
    bio: 'European champions of 2016, likely featuring Cristiano Ronaldo at a record sixth World Cup.',
    facts: [
      'Ronaldo is the all-time leading scorer in men\'s international football.',
      'Eusébio finished as top scorer when Portugal came third in 1966.',
    ],
    moments: [
      { year: '2016', text: 'Won Euro 2016, a first major title, despite Ronaldo\'s early final injury.' },
    ],
  },
  'DR Congo': {
    conf: 'CAF', best: 'Group stage (1974, as Zaire)',
    titles: ['Africa Cup of Nations 1968, 1974'],
    bio: 'Two-time African champions back at the World Cup for the first time since 1974.',
    facts: [
      'As Zaire in 1974 they were the first Black African nation to reach a World Cup.',
      'They won the Africa Cup of Nations in 1968 and 1974.',
    ],
    moments: [
      { year: '1974', text: 'Became the first Black African team at a World Cup, as Zaire.' },
    ],
  },
  'Uzbekistan': {
    conf: 'AFC', best: 'Debut (2026)',
    titles: [],
    bio: 'Central Asian side reaching a maiden World Cup after years of near misses.',
    facts: [
      'Independent since 1991, this is their first-ever World Cup.',
      'They have a strong youth pedigree, winning the AFC U-23 Asian Cup in 2018.',
    ],
    moments: [
      { year: '2026', text: 'Qualified for a first World Cup in the nation\'s history.' },
    ],
  },
  'Colombia': {
    conf: 'CONMEBOL', best: 'Quarter-finals (2014)',
    titles: ['Copa América 2001'],
    bio: 'Flair-filled South American side back after missing 2022, led by James Rodríguez.',
    facts: [
      'James won the Golden Boot in 2014 with six goals.',
      'They won the 2001 Copa América on home soil without conceding a goal.',
    ],
    moments: [
      { year: '2014', text: 'Reached a first World Cup quarter-final; James scored a stunning volley.' },
    ],
  },
  // ---------------- Group L ----------------
  'England': {
    conf: 'UEFA', best: 'Champions (1966)',
    titles: ['World Cup 1966'],
    bio: 'World champions of 1966 and recent semi-finalists, long chasing a second major title.',
    facts: [
      'Geoff Hurst\'s hat-trick in the 1966 final remains the only one in a World Cup final.',
      'They reached the semi-finals in 2018 and back-to-back Euro finals in 2021 and 2024.',
    ],
    moments: [
      { year: '1966', text: 'Won the World Cup on home soil, beating West Germany 4–2 after extra time.' },
    ],
  },
  'Croatia': {
    conf: 'UEFA', best: 'Runners-up (2018)',
    titles: [],
    bio: 'Serial overachievers who have reached a final and a semi-final in the last two World Cups.',
    facts: [
      'They reached the 2018 final and finished third in 2022 — remarkable for a small nation.',
      'Luka Modrić won the 2018 Golden Ball as the tournament\'s best player.',
    ],
    moments: [
      { year: '1998', text: 'Finished third on their World Cup debut, Davor Šuker top scorer.' },
      { year: '2018', text: 'Reached a first World Cup final, beaten by France.' },
    ],
  },
  'Ghana': {
    conf: 'CAF', best: 'Quarter-finals (2010)',
    titles: ['Africa Cup of Nations ×4'],
    bio: 'The Black Stars, four-time African champions and one of the continent\'s most followed teams.',
    facts: [
      'In 2010 they came within a Luis Suárez handball and a missed penalty of the semi-finals.',
      'They have won the Africa Cup of Nations four times.',
    ],
    moments: [
      { year: '2010', text: 'Agonisingly went out on penalties to Uruguay in the quarter-final.' },
    ],
  },
  'Panama': {
    conf: 'CONCACAF', best: 'Group stage',
    titles: [],
    bio: 'Central American side back at the World Cup for the second time after their 2018 debut.',
    facts: [
      'Their 2018 qualification sparked a national holiday in Panama.',
      'They have reached two CONCACAF Gold Cup finals.',
    ],
    moments: [
      { year: '2018', text: 'Made their World Cup debut and scored a first-ever finals goal against England.' },
    ],
  },
};

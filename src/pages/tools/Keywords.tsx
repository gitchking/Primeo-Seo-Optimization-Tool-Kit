import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";

const Keywords = () => {
  const [keyword, setKeyword] = useState("");
  const [generatedKeywords, setGeneratedKeywords] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateKeywords = () => {
    if (!keyword) return;
    setIsLoading(true);
    setTimeout(() => {
      const keywords = `anime 2025
new anime 2025
devil may cry anime 2025
upcoming anime 2025
best anime 2025
spring anime 2025
summer anime 2025
super cube anime 2025
winter anime 2025
romance anime 2025
dmc anime 2025
anime 2025 awards
anime 2025 awards winners
anime 2025 april
anime 2025 anime
anime 2025 autumn
anime 2025 all
anime 2025 adventure
anime 2025 a voir
anime 2025 anime planet
anime 2025 anime list
anne shirley anime 2025
action anime 2025
all new anime 2025
all upcoming anime 2025
alchemist anime 2025
anne shirley anime 2025 where to watch
anticipated anime 2025
assassin anime 2025
alice in wonderland anime 2025
all anime 2025
anime 2025 best
anime 2025 boston
anime 2025 bowman
anime 2025 best reddit
anime 2025 boy
anime boston 2025 dates
anime boston 2025 tickets
anime boston 2025 schedule
anime boston 2025 guests
anime berserk 2025
best new anime 2025
best romance anime 2025
berserk anime 2025
best isekai anime 2025
best upcoming anime 2025
bak anime 2025
best anime 2025 reddit
best spring anime 2025
best anime 2025 crunchyroll
anime 2025 crunchyroll
anime 2025 convention
anime 2025 calendar
anime 2025 coming out
anime 2025 chart
anime 2025 completed
anime 2025 coming
anime 2025 comedy
anime 2025 chinese
anime 2025 coming soon
crunchyroll upcoming anime 2025
chinese anime 2025
crunchyroll best anime 2025
cocoon anime 2025
cat's eye anime 2025
crunchyroll top anime 2025
comedy anime 2025
city anime 2025
crunchyroll anime 2025
cars and anime 2025
anime 2025 dub
anime 2025 dates
anime 2025 demon
anime 2025 download
anime 2025 drama
anime 2025 da vedere
anime 2025 dub list
anime 2025 detective
anime 2025 doctor
devil may cry anime 2025 release date
devil may cry anime 2025 cast
devil may cry anime 2025 season 2
devil may cry anime 2025 review
devil may cry anime 2025 voice actors
devil may cry anime 2025 characters
dark elf anime 2025
digimon anime 2025
anime 2025 expo
anime 2025 english dub
anime 2025 events
anime 2025 estrenos
anime 2025 english
anime 2025 english dub list
anime 2025 elf
anime expo 2025 tickets
anime expo 2025 schedule
anime expo 2025 guests
expo anime 2025
estrenos anime 2025
elf anime 2025
event anime 2025
english dubbed anime 2025
eventos de anime 2025
event cosplay anime 2025
every anime 2025
el paso anime 2025
ecchi anime 2025 crunchyroll
anime 2025 fall
anime 2025 fantasy
anime 2025 finished
anime 2025 fighting
anime 2025 film
anime 2025 full episode
anime 2025 flower
anime 2025 free
anime 2025 february
anime in 2022
fall anime 2025
fantasy anime 2025
famous anime 2025
fate anime 2025
fighting anime 2025
funny anime 2025
free anime 2025
food anime 2025
festival anime 2025
flower anime 2025
anime 2025 girl
anime 2025 good
anime 2025 game
anime garden 2025
anime gundam 2025
anime gl 2025
anime games 2025 ps5
anime gacha 2025
good anime 2025
gundam anime 2025
gnosia sci fi rpg anime 2025
gl anime 2025
gender bender anime 2025
gore anime 2025
good romance anime 2025
good new anime 2025
grisaia phantom trigger anime 2025
gundam new anime 2025
anime 2025 houston
anime 2025 horror
anime 2025 hindi
anime 2025 hindi dubbed
anime 2025 harem
anime 2025 high school
anime 2025 historical
anime 2025 hotel
healer anime 2025
harem anime 2025
highest rated anime 2025
horror anime 2025
how old is dante in dmc anime 2025
hell teacher anime 2025
hero anime 2025
hidive new anime 2025
hatsune miku anime 2025
hulu anime 2025
anime 2025 isekai
anime 2025 imdb
anime 2025 in hindi dubbed
anime 2025 in hindi
anime 2025 in netflix
anime impulse 2025
anime in 2025
anime iowa 2025
anime ink 2025
anime in 2025 list
isekai anime 2025
ice skating anime 2025
is devil may cry an anime 2025
when is anime expo 2025
what is the best anime 2025
what is the most popular anime 2025
strongest character in anime 2025
what is the most watched anime 2025
when is sac anime 2025
anime 2025 july
anime 2025 january
anime 2025 julio
anime 2025 july releases
anime 2025 japanese
anime 2025 july list
anime 2025 japan
anime in 2035
july anime 2025
january anime 2025
japanese anime 2025
josei anime 2025
jc staff anime 2025
jan anime 2025
justice league anime 2025
jojo anime 2025
july new anime 2025
junji ito anime 2025
anime 2025 kiss
anime 2025 korean
anime 2025 kino
anime 2025 kurt
anime 2025 king
anime kansas 2025
anime konvencija 2025
anime kingdom 2025
anime kpop 2025
anime kids 2025
kamen rider anime 2025
korean anime 2025
kadokawa anime 2025
kingdom anime 2025
kagurabachi anime 2025
kaiba anime 2025
kyoto animation new anime 2025
king arthur anime 2025
kenshin anime 2025
katekyo hitman reborn anime 2025
anime 2025 list
anime 2025 lineup
anime 2025 los angeles
anime 2025 livechart
anime 2025 love
anime 2025 latest
anime 2025 love story
anime 2025 like solo leveling
anime 2025 lista
anime 2025 lançamento
leviathan anime 2025
latest anime 2025
list anime 2025
lady devil may cry anime 2025
leviathan anime 2025 release date
live action anime 2025
lazarus anime 2025
love anime 2025
list of isekai anime 2025
las vegas anime 2025
anime 2025 movies
anime 2025 myanimelist
anime 2025 may
anime 2025 must watch
anime 2025 mystery
anime 2025 magic
anime 2025 march
anime 2025 most anticipated
anime 2025 mecha
anime 2025 manga
most popular anime 2025
must watch anime 2025
mappa upcoming anime 2025
most watched anime 2025
movie anime 2025
most anticipated anime 2025
mappa anime 2025
mecha anime 2025
mono anime 2025
magical girl anime 2025
anime 2025 netflix
anime 2025 nominees
anime 2025 new seasons
anime 2025 nyc
anime 2025 news
anime 2025 new release
anime 2025 name
anime 2025 now
anime 2025 ninja
anime 2025 nominations
new romance anime 2025
new isekai anime 2025
netflix anime 2025
new bl anime 2025
new chinese anime 2025
new upcoming anime 2025
new anime 2025 list
new anime 2025 july
new anime 2025 april
anime 2025 on netflix
anime 2025 ongoing
anime 2025 op mc
anime 2025 of the year
anime 2025 online
anime 2025 orb
anime 2025 one piece
anime 2025 october
anime 2025 out now
anime ohio 2025
ongoing anime 2025
office romance anime 2025
op mc anime 2025
one piece anime 2025
oscar anime 2025
overlord anime 2025
overpowered anime 2025
original anime 2025
oscar winning anime 2025
overlord movie anime 2025
anime 2025 popular
anime 2025 pfp
anime 2025 princess
anime 2025 planner
anime 2025 prime
anime 2025 photo
anime 2025 pic
anime 2025 printemps
anime 2025 primavera
anime pasadena 2025
popular anime 2025
planet anime 2025
pokemon anime 2025
predator anime 2025
peliculas anime 2025
peak anime 2025
popular anime 2025 ott
popular romance anime 2025
psychological anime 2025
pokemon new anime 2025
anime 2025 q1
anime 2025 q2
anime quiz 2025
anime quotes 2025
anime q3 2025
anime q4 2025
best anime quotes 2025
best anime q1 2025
queer anime 2025
animes 2025 que ver
q1 anime 2025
q2 anime 2025
q3 anime 2025
queen city anime 2025
queen bee anime 2025
quiz anime 2025
quel est le meilleur anime en 2025
quebec anime 2025
quelle est le meilleur anime 2025
anime 2025 releases
anime 2025 reddit
anime 2025 romance
anime 2025 results
anime 2025 releases summer
anime 2025 ranking
anime 2025 rom com
anime 2025 rekomendasi
anime 2025 reincarnation
riverwalk anime 2025
romcom anime 2025
riverwalk anime 2025 guests
ranking anime 2025
returning anime 2025
recommended anime 2025
rating anime 2025
reverse harem anime 2025
released anime 2025
anime 2025 summer
anime 2025 spring
anime 2025 summer season
anime 2025 summer releases
anime 2025 schedule
anime 2025 summer list
anime 2025 season 2
anime 2025 spring lineup
anime 2025 shows
anime 2025 slice of life
sac anime 2025
super cube anime 2025 where to watch
shoujo anime 2025
steel ball run anime 2025
series anime 2025
summer season anime 2025
spring anime 2025 crunchyroll
anime 2025 to watch
anime 2025 top
anime 2025 tier list
anime 2025 top 10
anime 2025 terbaik
anime 2025 trending
anime 2025 telegram
anime 2025 tv shows
anime 2025 terbaru
anime 2025 toronto
top anime 2025
top 10 upcoming anime 2025
trending anime 2025
top 10 anime 2025
the super cube anime 2025
top 10 best anime 2025
the rose of versailles anime 2025
top spring anime 2025
tier list anime 2025
the super cube anime 2025 where to watch
anime 2025 upcoming
anime 2025 uscite
anime 2025 updates
anime usa 2025
anime ultra 2025
anime underrated 2025
anime usa 2025 dates
anime uk 2025
anime upcoming 2025 summer
anime upcoming 2025 july
upcoming anime 2025 january
upcoming romance anime 2025
upcoming isekai anime 2025
upcoming anime 2025 release date
upcoming anime 2025 july
upcoming bl anime 2025
upcoming anime 2025 summer
upcoming spring anime 2025
upcoming anime 2025 april
anime 2025 voting
anime 2025 villainess
anime 2025 vf
anime 2025 vampire
anime 2025 video
anime 2025 verano
animevietsub 2025
anime 2025 vostfr
anime 2025 vevey
animeverse 2025
villainess anime 2025
vampire anime 2025
vergil dmc anime 2025
vergil devil may cry anime 2025
vigilante anime 2025
violent anime 2025
vote anime 202.5
vampire bl anime 2025
vergil anime 2025
video game anime 2025
anime 2025 winter
anime 2025 wiki
anime 2025 winners
anime 2025 worth watching
anime 2025 watch
anime 2025 wallpaper
anime 2025 witch
where can i watch initial d anime 2025
where to watch super cube anime 2025
where to watch anime 2025
winter season anime 2025
winter anime 2025 schedule
winter anime 2025 crunchyroll
world best anime 2025
x men anime 2025
xếp hạng anime 2025
xem devil may cry anime 2025
xem anime 2025
anime expo 2025 final fantasy xiv
xbox anime month 2025
anime games on xbox game pass 2025
hunter x hunter new anime 2025
sonic x anime 2025
anime 2025 yuri
anime 2025 youtube
anime 2025 yakuza
anime 2025 yaiba
anime 2025 year
anime yugioh 2025
anime yandere 2025
anime awards 2025 youtube
anime 2025 new year
anime expo 2025 youtube
yuri anime 2025
yaiba anime 2025
yugioh anime 2025
yami healer anime 2025
yaiba anime 2025 where to watch
yakuza anime 2025
yaiba samurai legend anime 2025
yandere anime 2025
yuri anime 2025 reddit
year of the anime 2025
anime 2025 zenshu
anime 2025 zima
anime zap 2025 schedule
anime zap 2025
anime zing 2025
anime zombie 2025
anime expo 2025 zenless zone zero
anime expo 2025 zzz
new anime 2025 zenshu
anime japan 2025 re zero
zombie anime 2025
zenshu anime 2025
zoids anime 2025
zero to hero anime 2025
zatch bell anime 2025
zapowiedzi anime 2025
zenless zone zero anime expo 2025
best anime 0f 2025
anime expo 2025 day 0
2025 02 anime collection
2025 03 anime collection
2025-01 anime collection
2025-05 anime clollection
2025-05 anime collection
2025 04 anime collection
2025-06 anime collection
worst anime of 2021
10 best anime 2025
10 top anime 2025
12 episode anime 2025
10 most popular anime 2025
10 anime 2025
10 ten anime 2025
#1 anime 2025
a 1 pictures upcoming anime 2025
anime 2024 releases
season 2 anime 2025
top 20 anime 2025
2025 anime
3d anime 2025
anime expo 2025 3 july
anime expo 2025 july 3
anime 2025 season 3
anime big 3 2025
anime top 3 2025
anime expo 2025 day 3
anime japan 2025 day 3
anime tháng 3 2025
anime saison 3 2025
30 may 2025 anime
the new big 3 anime 2025
top 3 anime 2025
top 3 best anime 2025
top 30 anime 2025
new 3d anime 2025
season 3 anime 2025
top 3 most popular anime 2025
top 3 anime 2025 crunchyroll
anime 4k 2025
anime expo 2025 4 day pass
wallpaper anime 2025 4k
anime july 4 2025
anime expo 2025 july 4
anime expo 2025 day 4
anime expo 2025 july 4th
anime 2025 tháng 4
anime thang 4 2025
anime 405 okc 2025
🩸update 4.0🩸 anime vanguards codes 2025
top 4 anime 2025
wallpaper 4k anime 2025
big 4 anime 2025
spring 2025 anime ranking week 4
anime reborn upd 4 codes 2025
anime top 5 2025
anime july 5 2025
anime expo 2025 july 5
anime release july 5 2025
anime tháng 5 2025
top 50 strongest anime characters 2025
top 5 anime 2025
top 5 trending anime 2025
top 5 new anime 2025
top 5 upcoming anime 2025
top 5 most watched anime 2025
top 5 most popular anime 2025
top 5 anime 2025 crunchyroll
top 5 romance anime 2025
best 5 anime 2025
dmc anime 2025 episode 6
anime expo 2025 july 6
anime tháng 6 2025
anime 2022 list
no 6 anime 2025
top 6 anime 2025
winter 2025 anime rankings week 6
kingdom anime season 6 october 2025
anime expo july 3 6 2025
anne shirley anime 2025 episode 6
spring 2025 anime rankings week 6
6 april 2025 anime
kingdom anime season 6 2025
anime milwaukee 2025 7 mar
anime 7 2025
anime tháng 7 2025
anime hay tháng 7 2025
7 deadly sins anime 2025
jojo part 7 anime 2025
los 7 pecados capitales anime 2025
winter 2025 anime rankings week 7
anne shirley anime 2025 episode 7
anne shirley anime 2025 ep 7
lịch chiếu anime tháng 7 2025
86 anime 2025
anime 2010 to 2019
kaiju no 8 anime 2025
spring 2025 anime rankings week 8
winter 2025 anime rankings week 8
anne shirley anime 2025 episode 8
super cube anime 2025 episode 8
anne shirley anime 2025 ep 8
anime sites like 9anime 2025
9th feb 2025 anime
9th february 2025 anime release date
which anime is coming on 9th feb 2025
what is on 9 february 2025 in anime
spring 2025 anime rankings week 9
what is on 9 february 2025 in anime list
9anime anime awards 2023`;
      setGeneratedKeywords(keywords);
      setIsLoading(false);
    }, 1000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedKeywords);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Keyword Research Tool</h1>
        <p className="text-muted-foreground mb-6">
          Enter a seed keyword to generate a list of related keywords.
        </p>
        <div className="flex gap-4 mb-6">
          <Input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g., anime 2025"
            className="flex-grow"
          />
          <Button onClick={generateKeywords} disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate Keywords"}
          </Button>
        </div>
        {generatedKeywords && (
          <div className="relative">
            <Textarea
              readOnly
              value={generatedKeywords}
              className="h-96"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={copyToClipboard}
              className="absolute top-2 right-2"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Keywords;

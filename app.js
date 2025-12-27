"use strict";
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

/* ===== トップページ ===== */
app.get("/", (req, res) => {
    res.render("index");
});

/* ===== データ ===== */
let artists = [
    { id: 1, name: "Official髭男dism", formed_on: "2012-06-07" },
    { id: 2, name: "King Gnu", formed_on: "2015-01-01" },
    { id: 3, name: "Mrs. GREEN APPLE", formed_on: "2013-04-23" }
];

let creep = [
    { id: 1, name: "こんなところに居たのかやっと見つけたよ", released_on: "2024-04-03",
      tracks: ["ままごと","人と人と人と人","青梅","生レバ","I","インタビュー","べつに有名人でもないのに","星にでも願ってろ","dmrks","喉仏","本屋の","センチメンタルママ","もうおしまいだよさようなら","あと5秒","天の声"]
    },
    { id: 2, name: "夜にしがみついて、朝で溶かして", released_on: "2021-03-10",
      tracks: ["料理","ポリコ","二人の間","四季","愛す","しょうもな","一生に一度愛してるよ","ニガツノナミダ","ナイトオンザプラネット","しらす","なんか出てきちゃってる","キケンナアソビ","モノマネ","幽霊失格","こんなに悲しいのに腹が鳴る"]
    },
    { id: 101, name: "イト", released_on: "2017-07-19", tracks: ["イト"] },
    { id: 102, name: "破花", released_on: "2016-06-22", tracks: ["破花"] }
];

let brands = [
    { id: 1, name: "GUCCI", founded_on: "1921-03-15" },
    { id: 2, name: "PRADA", founded_on: "1913-04-10" },
    { id: 3, name: "CHANEL", founded_on: "1910-01-19" }
];

/* ===== アーティスト ===== */
app.get("/artists/create", (req, res) => res.render("artists/artists_new"));
app.post("/artists", (req, res) => {
    const id = artists.length > 0 ? Math.max(...artists.map(a => a.id)) + 1 : 1;
    artists.push({ id, name: req.body.name, formed_on: req.body.formed_on });
    res.redirect("/artists");
});
app.get("/artists/edit/:id", (req, res) => {
    const id = Number(req.params.id);
    const artist = artists.find(a => a.id === id);
    res.render("artists/artists_edit", { data: artist });
});
app.post("/artists/update/:id", (req, res) => {
    const id = Number(req.params.id);
    const artist = artists.find(a => a.id === id);
    artist.name = req.body.name;
    artist.formed_on = req.body.formed_on;
    res.redirect("/artists");
});
app.get("/artists/:id", (req, res) => {
    const id = Number(req.params.id);
    const artist = artists.find(a => a.id === id);
    if (!artist) return res.status(404).send("データが見つかりません");
    res.render("artists/artists_detail", { data: artist });
});
// 一覧表示（検索ロジックを除去）
app.get("/artists", (req, res) => {
    res.render("artists/artists", { data: artists });
});
app.get("/artists/delete/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = artists.findIndex(a => a.id === id);
    if (index !== -1) artists.splice(index, 1);
    res.redirect("/artists");
});

/* ===== クリープハイプ ===== */
app.get("/creep/create", (req, res) => res.render("creep/creep_new"));
app.post("/creep", (req, res) => {
    const id = creep.length > 0 ? Math.max(...creep.map(a => a.id)) + 1 : 1;
    creep.push({ id, name: req.body.name, released_on: req.body.released_on, tracks: [] });
    res.redirect("/creep");
});
// 一覧表示（検索ロジックを除去）
app.get("/creep", (req, res) => {
    res.render("creep/creep", { data: creep });
});
app.get("/creep/:id", (req,res) => {
    const id = Number(req.params.id);
    const album = creep.find(a => a.id === id);
    if(!album) return res.status(404).send("データが見つかりません");
    res.render("creep/creep_detail", { data: album });
});
app.get("/creep/edit/:id", (req,res) => {
    const id = Number(req.params.id);
    const album = creep.find(a => a.id === id);
    res.render("creep/creep_edit", { data: album });
});
app.post("/creep/update/:id", (req,res) => {
    const id = Number(req.params.id);
    const album = creep.find(a => a.id === id);
    album.name = req.body.name;
    album.released_on = req.body.released_on;
    res.redirect("/creep");
});
app.get("/creep/delete/:id",(req,res)=>{
    const id = Number(req.params.id);
    const index = creep.findIndex(a=>a.id===id);
    if (index !== -1) creep.splice(index,1);
    res.redirect("/creep");
});

/* ===== ファッションブランド ===== */
app.get("/brands/create", (req,res) => res.render("brands/brands_new"));
app.post("/brands", (req,res) => {
    const id = brands.length > 0 ? Math.max(...brands.map(b => b.id)) + 1 : 1;
    brands.push({ id, name: req.body.name, founded_on: req.body.founded_on });
    res.redirect("/brands");
});
// 一覧表示（検索ロジックを除去）
app.get("/brands", (req,res) => {
    res.render("brands/brands", { data: brands });
});
app.get("/brands/:id", (req,res) => {
    const id = Number(req.params.id);
    const brand = brands.find(b => b.id === id);
    if(!brand) return res.status(404).send("データが見つかりません");
    res.render("brands/brands_detail", { data: brand });
});
app.get("/brands/edit/:id", (req,res) => {
    const id = Number(req.params.id);
    const brand = brands.find(b => b.id === id);
    res.render("brands/brands_edit", { data: brand });
});
app.post("/brands/update/:id", (req,res) => {
    const id = Number(req.params.id);
    const brand = brands.find(b => b.id === id);
    brand.name = req.body.name;
    brand.founded_on = req.body.founded_on;
    res.redirect("/brands");
});
app.get("/brands/delete/:id", (req,res) => {
    const id = Number(req.params.id);
    const index = brands.findIndex(b => b.id === id);
    if(index !== -1) brands.splice(index,1);
    res.redirect("/brands");
});

/* ===== サーバ起動 ===== */
app.listen(8080, () => console.log("http://localhost:8080 で起動中"));
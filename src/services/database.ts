import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite'
import { stickers } from '@/data/stickers'
 
const dbName = 'appdata'
let db: SQLiteDBConnection | null = null
let initialized = false
const sqliteConnection = new SQLiteConnection(CapacitorSQLite)

export interface AchievementRow {
  id: number
  nome: string
  descricao: string
  icone: string
  desbloqueada: number
  data_desbloqueio: string | null
}

const achievementsSeed = [
  { id: 1, nome: 'Primeira Figurinha', descricao: 'Desbloquear ao coletar a primeira figurinha.', icone: 'sparkles-outline' },
  { id: 2, nome: 'Iniciante', descricao: 'Coletar 10 figurinhas.', icone: 'ribbon-outline' },
  { id: 3, nome: 'Colecionador', descricao: 'Coletar 25 figurinhas.', icone: 'albums-outline' },
  { id: 4, nome: 'Album em Construcao', descricao: 'Coletar 50 figurinhas.', icone: 'construct-outline' },
  { id: 5, nome: 'Cacador de Raras', descricao: 'Coletar 5 figurinhas raras.', icone: 'diamond-outline' },
  { id: 6, nome: 'Especialista em Raras', descricao: 'Coletar 15 figurinhas raras.', icone: 'medal-outline' },
  { id: 7, nome: 'Brilho Inicial', descricao: 'Coletar 3 figurinhas brilhantes.', icone: 'sunny-outline' },
  { id: 8, nome: 'Mestre das Brilhantes', descricao: 'Coletar 10 figurinhas brilhantes.', icone: 'trophy-outline' },
  { id: 9, nome: 'Album Quase Completo', descricao: 'Completar 80% do album.', icone: 'trending-up-outline' },
  { id: 10, nome: 'Campeao da Copa', descricao: 'Completar 100% do album.', icone: 'football-outline' },
  { id: 11, nome: 'Colecao Completa', descricao: 'Completar todas as figurinhas de uma colecao especifica.', icone: 'shield-checkmark-outline' },
]
 
async function ensureDatabase() {
  if (initialized && db) {
    return
}

if (!db) {
db = await sqliteConnection.createConnection(dbName, false, 'no-encryption', 1, false)
}

    await db.open()
    await db.execute( `CREATE TABLE IF NOT EXISTS contatos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        telefone TEXT
      );`,
    )
     
    await db.execute(`CREATE TABLE IF NOT EXISTS usuario (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        senha TEXT NOT NULL
      );`,
    )

    await db.execute(`CREATE UNIQUE INDEX IF NOT EXISTS idx_usuario_email ON usuario(email);`)
    await db.run(
      `INSERT OR IGNORE INTO usuario (id, nome, email, senha) VALUES (1, ?, ?, ?);`,
      ['Admin', 'admin@teste.com', '123'],
    )
    await db.run(
      `INSERT OR IGNORE INTO usuario (nome, email, senha) VALUES (?, ?, ?);`,
      ['Usuario Teste', 'andre@gmail.com', 'andre123'],
    )

    await db.execute(`CREATE TABLE IF NOT EXISTS stickers (
        id INTEGER PRIMARY KEY,
        name TEXT,
        team TEXT NOT NULL,
        image TEXT NOT NULL,
        rarity TEXT NOT NULL,
        is_shiny INTEGER NOT NULL DEFAULT 0,
        collected INTEGER NOT NULL DEFAULT 0
      );`,
    )

    await db.execute(`CREATE TABLE IF NOT EXISTS achievements (
        id INTEGER PRIMARY KEY,
        nome TEXT NOT NULL,
        descricao TEXT NOT NULL,
        icone TEXT NOT NULL,
        desbloqueada INTEGER NOT NULL DEFAULT 0,
        data_desbloqueio TEXT
      );`,
    )

    await db.execute(`CREATE TABLE IF NOT EXISTS user_achievements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL DEFAULT 1,
        achievement_id INTEGER NOT NULL,
        data_desbloqueio TEXT NOT NULL,
        UNIQUE(user_id, achievement_id)
      );`,
    )

    for (const sticker of stickers) {
      await db.run(
        `INSERT OR IGNORE INTO stickers (id, name, team, image, rarity, is_shiny, collected)
         VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [sticker.id, sticker.name, sticker.team, sticker.image, sticker.rarity || 'Comum', sticker.isShiny ? 1 : 0, sticker.collected ? 1 : 0],
      )
    }

    for (const achievement of achievementsSeed) {
      await db.run(
        `INSERT OR IGNORE INTO achievements (id, nome, descricao, icone, desbloqueada, data_desbloqueio)
         VALUES (?, ?, ?, ?, 0, NULL);`,
        [achievement.id, achievement.nome, achievement.descricao, achievement.icone],
      )
    }

   initialized = true 
  }

  function getDb(){
    if (!db) {
      throw new Error('Banco de dados ainda não inicializado ')
  }
    return db
  }

  export async function initDatabase(){
    try{
      await ensureDatabase()
    } catch (error){
      console.error('Erro ao iniciar DB', error)
      throw error
    }
  }

  export async function addUsuario(nome: string, email: string, senha: string){
    await ensureDatabase()
    const query = 'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?);'
    await getDb().run(query, [nome, email, senha])
  }

  export async function findUsuarioByEmail(email: string){
    await ensureDatabase()
    const query = 'SELECT * FROM usuario WHERE lower(email) = lower(?);'
    const result = await getDb().query(query, [email])
    return result.values || []
  }

  export async function updateUsuario(nome: string, email: string, senha: string, id: number){
    await ensureDatabase()
    const query = 'UPDATE usuario SET nome = ?, email = ?, senha = ? WHERE id = ?;'
    await getDb().run(query, [nome, email, senha, id])
  }

  export async function realizarLogin(login: string, senha: string){
    await ensureDatabase()
    const query = 'SELECT * FROM usuario WHERE email = ? AND senha = ?;'
    const result = await getDb().query(query, [login, senha])
    return result.values || []
  }

  export async function addContato(nome: string, email: string, telefone: string){
    await ensureDatabase()
    const query = 'INSERT INTO contatos (nome, email, telefone) VALUES (?, ?, ?);'
    await getDb().run(query, [nome, email, telefone])
  }

  export async function listContatos(){
    await ensureDatabase()
    const result = await getDb().query(`SELECT * FROM contatos;`)
    return result.values || []
  }

  export async function deleteContatoById(id: number){
    await ensureDatabase()
    const query = `DELETE FROM contatos WHERE id = ?;`
    return await getDb().run(query, [id])
  }

  export async function updateContato(nome: string, email: string, telefone: string, id: number){
    await ensureDatabase()
    const query = `UPDATE contatos SET nome = ?, email = ?, telefone = ? WHERE id = ?;`
    await getDb().run(query, [nome, email, telefone, id])
  }

  export async function findContatoById(id: number){
    await ensureDatabase()
    const query = `SELECT * FROM contatos WHERE id = ?;`
    const result = await getDb().query(query, [id])
    return result.values || []
  }

  export async function listStickers(){
    await ensureDatabase()
    const result = await getDb().query(`SELECT * FROM stickers ORDER BY id;`)
    return result.values || []
  }

  export async function updateStickerCollected(id: number, collected: boolean, userId = 1){
    await ensureDatabase()
    const query = `UPDATE stickers SET collected = ? WHERE id = ?;`
    await getDb().run(query, [collected ? 1 : 0, id])
    await recalculateAchievements(userId)
  }

  export async function listAchievements(userId = 1){
    await ensureDatabase()
    await recalculateAchievements(userId)
    const result = await getDb().query(`SELECT * FROM achievements ORDER BY id;`)
    return (result.values || []) as AchievementRow[]
  }

  export async function recalculateAchievements(userId = 1){
    await ensureDatabase()
    const statsResult = await getDb().query(`
      SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN collected = 1 THEN 1 ELSE 0 END) AS collected,
        SUM(CASE WHEN collected = 1 AND rarity = 'Rara' THEN 1 ELSE 0 END) AS rare_collected,
        SUM(CASE WHEN collected = 1 AND is_shiny = 1 THEN 1 ELSE 0 END) AS shiny_collected
      FROM stickers;
    `)

    const stats = statsResult.values?.[0] || {}
    const total = Number(stats.total || 0)
    const collected = Number(stats.collected || 0)
    const rareCollected = Number(stats.rare_collected || 0)
    const shinyCollected = Number(stats.shiny_collected || 0)
    const completion = total > 0 ? (collected / total) * 100 : 0

    const collectionResult = await getDb().query(`
      SELECT team,
        COUNT(*) AS total,
        SUM(CASE WHEN collected = 1 THEN 1 ELSE 0 END) AS collected
      FROM stickers
      GROUP BY team
      HAVING total > 0 AND total = collected
      LIMIT 1;
    `)

    const hasCompletedCollection = (collectionResult.values || []).length > 0
    const unlockedIds = achievementsSeed
      .filter((achievement) => {
        switch (achievement.id) {
          case 1: return collected >= 1
          case 2: return collected >= 10
          case 3: return collected >= 25
          case 4: return collected >= 50
          case 5: return rareCollected >= 5
          case 6: return rareCollected >= 15
          case 7: return shinyCollected >= 3
          case 8: return shinyCollected >= 10
          case 9: return completion >= 80
          case 10: return completion >= 100
          case 11: return hasCompletedCollection
          default: return false
        }
      })
      .map((achievement) => achievement.id)

    for (const achievementId of unlockedIds) {
      const unlockedAt = new Date().toISOString()
      await getDb().run(
        `UPDATE achievements
         SET desbloqueada = 1,
             data_desbloqueio = COALESCE(data_desbloqueio, ?)
         WHERE id = ?;`,
        [unlockedAt, achievementId],
      )
      await getDb().run(
        `INSERT OR IGNORE INTO user_achievements (user_id, achievement_id, data_desbloqueio)
         VALUES (?, ?, ?);`,
        [userId, achievementId, unlockedAt],
      )
    }
  }




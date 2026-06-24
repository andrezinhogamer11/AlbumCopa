import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite'
 
const dbName = 'appdata'
let db: SQLiteDBConnection | null = null
let initialized = false
const sqliteConnection = new SQLiteConnection(CapacitorSQLite)
 
async function ensureDatabase() {
  if (!initialized && db) {
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




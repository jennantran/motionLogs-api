const logsService = {
    getAllLogs(knex){
        return knex
            .select('*')
            .from('save_logs');
    },
    insertLog(knex, newLog){
        return knex 
            .insert(newLog)
            .into('save_logs')
            .returning('*')
            .then(rows => {
                return rows[0]
        })
    },
    deleteLog(knex, id){
        return knex('save_logs')
        .where( { id })
        .delete()
    },
}

module.exports = logsService;
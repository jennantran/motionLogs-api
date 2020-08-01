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
    getLogsById(knex,user_id){
        return knex
            .from('save_logs')
            .select('*')
            .where('user_id',user_id)
    },
    deleteLog(knex, log_id){
        return knex('save_logs')
        .where( { log_id })
        .delete()
    },
}

module.exports = logsService;
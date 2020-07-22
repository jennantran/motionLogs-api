const logsService = {
    getAllLogs(knex){
        return knex
            .select('*')
            .from('save_logs');
    },
}

module.exports = logsService;
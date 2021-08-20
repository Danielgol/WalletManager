const {
    HTTP_OK,
    HTTP_NOT_FOUND,
    HTTP_CREATED
} = require('../utils/Constants')

const simpleDatabase = []


/**
 * It evaluates if the index corresponds to a resource on the database
 */
function isValidIndex(index) {
    return index >= 0 && index < simpleDatabase.length
}


module.exports = {
    /**
     * Retrieves all resources inside the database
     */
    list(req, res) {
        return res.status(HTTP_OK).json(simpleDatabase)
    },

    /**
     * Creates a new resource inside the database
     */
    create(req, res) {
        const body = req.body

        simpleDatabase.push(body)

        return res.status(HTTP_CREATED).json(body)
    },

    /**
     * Retrieves a specific resource
     */
    retrieve(req, res) {
        const { index } = req.params  // Equivalent to req.params.index

        if (!isValidIndex(index)) {
            return res.status(HTTP_NOT_FOUND).send()
        }

        const resource = simpleDatabase[index]
        
        return res.status(HTTP_OK).json(resource)
    },

    /**
     * Updates a specific resource
     */
     update(req, res) {
        const { index } = req.params
        const newResource = req.body
        
        if (!isValidIndex(index)) {
            return res.status(HTTP_NOT_FOUND).send()
        }
        
        simpleDatabase.splice(index, 1, newResource)

        return res.status(HTTP_OK).json(newResource)
    },

    /**
     * Deletes a specific resource
     */
     delete(req, res) {
        const { index } = req.params
        
        if (!isValidIndex(index)) {
            return res.status(HTTP_NOT_FOUND).send()
        }

        const deletedResource = simpleDatabase.splice(index, 1)[0]

        return res.status(HTTP_OK).json(deletedResource)
    }
}
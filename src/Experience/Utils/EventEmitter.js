// EventEmitter class as a helper class for event listening

export default class EventEmitter
{
    constructor(){
        this.callbacks = {}
        this.callbacks.base = {}
    }

    on(_names, callback){
        // Errors
        if(typeof _names === 'undefined' || _names === ''){
            console.warn('wrong names')
            return false
        }

        if(typeof callback === 'undefined'){
            console.warn('wrong callback')
            return false
        }

        // Resolve names
        const names = this.resolveNames(_names);

        // Each name
        names.forEach((_name) => {
            // Resolve name
            const name = this.resolveName(_name)

            // Create namespace if not exist
            if(!(this.callbacks[ name.namespace ] instanceof Object))
                this.callbacks[ name.namespace ] = {}

            // Create callback if not exist
            if(!(this.callbacks[ name.namespace ][ name.value ] instanceof Array))
                this.callbacks[ name.namespace ][ name.value ] = []

            // Add callback
            this.callbacks[ name.namespace ][ name.value ].push(callback)
        })

        return this
    }

    off(_names){
        // Errors
        if(typeof _names === 'undefined' || _names === ''){
            console.warn('wrong name')
            return false
        }

        // Resolve names
        const names = this.resolveNames(_names)

        // Each name
        names.forEach((_name) => {
            // Resolve name
            const name = this.resolveName(_name)

            // Remove namespace
            if(name.namespace !== 'base' && name.value === ''){
                delete this.callbacks[ name.namespace ]
            }

            // Remove specific callback in namespace
            else{
                // Default
                if(name.namespace === 'base'){
                    // Try to remove from each namespace
                    for(const namespace in this.callbacks){
                        if(this.callbacks[ namespace ] instanceof Object && this.callbacks[ namespace ][ name.value ] instanceof Array){
                            delete this.callbacks[ namespace ][ name.value ]

                            // Remove namespace if empty
                            if(Object.keys(this.callbacks[ namespace ]).length === 0)
                                delete this.callbacks[ namespace ]
                        }
                    }
                }

                // Specified namespace
                else if(this.callbacks[ name.namespace ] instanceof Object && this.callbacks[ name.namespace ][ name.value ] instanceof Array){
                    delete this.callbacks[ name.namespace ][ name.value ]

                    // Remove namespace if empty
                    if(Object.keys(this.callbacks[ name.namespace ]).length === 0)
                        delete this.callbacks[ name.namespace ]
                }
            }
        })

        return this
    }

    trigger(_name, _args){
        // Errors
        if(typeof _name === 'undefined' || _name === ''){
            console.warn('wrong name')
            return false
        }

        let finalResult = null
        let result = null

        // Default args
        const args = !(_args instanceof Array) ? [] : _args

        // Resolve names (should on have one event)
        let name = this.resolveNames(_name)

        // Resolve name
        name = this.resolveName(name[ 0 ])

        // Default namespace
        if(name.namespace === 'base'){
            // Try to find callback in each namespace
            for(const namespace in this.callbacks){
                if(this.callbacks[ namespace ] instanceof Object && this.callbacks[ namespace ][ name.value ] instanceof Array){
                    this.callbacks[ namespace ][ name.value ].forEach(function(callback){
                        result = callback.apply(this, args)

                        if(typeof finalResult === 'undefined')
                        {
                            finalResult = result
                        }
                    })
                }
            }
        }

        // Specified namespace
        else if(this.callbacks[ name.namespace ] instanceof Object){
            if(name.value === ''){
                console.warn('wrong name')
                return this
            }

            this.callbacks[ name.namespace ][ name.value ].forEach(function(callback){
                result = callback.apply(this, args)

                if(typeof finalResult === 'undefined')
                    finalResult = result
            })
        }

        return finalResult
    }

    resolveNames(_names){
        // Desc: Declare a variable `names` and assign the value of `_names`
        // Logic: Instantiate new names variable with argument values so any manipulations are returned as a new variable to work with
        let names = _names

        // Desc: Replace any character in the `names` string that is not a letter, number, space, comma, period, or forward slash with an empty string (effectively removing it)
        // Logic: Clean the input string to ensure only desired characters are present
        names = names.replace(/[^a-zA-Z0-9 ,/.]/g, '')
        
        // Desc: Replace any occurrence of a comma, forward slash, or multiple of these characters in a sequence with a single space
        // Logic: Convert common delimiters to spaces to prepare for splitting the string into an array
        names = names.replace(/[,/]+/g, ' ')

        // Desc: Split the `names` string into an array of strings wherever there's a space
        // Logic: Transform the cleaned string into an array format for easier individual name access or further processing
        names = names.split(' ')

        // Desc: Return the modified `names` array
        // Logic: Provide the processed names as an array to the caller
        return names
    }

    // Desc: Function definition for `resolveName` that takes an argument `name`
    // Logic: Define a function to process a string containing a name and possibly a namespace separated by a dot, then return an object with the original name, value, and namespace
    resolveName(name){
        // Desc: Declare a constant `newName` as an empty object to store the name components
        // Logic: Use an object to organize and return the name's various components
        const newName = {}

        // Desc: Split the `name` string into an array `parts` wherever there's a dot
        // Logic: Separate the name into its main value and potential namespace
        const parts = name.split('.')

        // Desc: Assign the original `name` to the `original` property of `newName`
        // Logic: Keep a reference to the original input for traceability
        newName.original  = name

        // Desc: Assign the first part of the split name (before the dot, if any) to the `value` property of `newName`
        // Logic: Capture the main value of the name for reference
        newName.value     = parts[ 0 ]

        // Desc: Default assignment of 'base' to the `namespace` property of `newName`
        // Logic: Set a default namespace in case no specific namespace is provided
        newName.namespace = 'base' // Base namespace

        // Desc: Check if a namespace was specified in the `name` (i.e., there's a dot and a non-empty string after it)
        // Logic: Override the default namespace with the specified one if present
        // Specified namespace
        if(parts.length > 1 && parts[ 1 ] !== ''){
            newName.namespace = parts[ 1 ]
        }

        // Desc: Return the constructed `newName` object
        // Logic: Provide the processed name components to the caller as an organized object
        return newName
    }
}


export default class Container {

    protected _services: Map<any, any> = new Map()
    protected _singletons: Map<any, any> = new Map()


    register(name: string, definition: any, dependencies?: Array<string>) {
        this._services.set(name, { definition: definition, dependencies: dependencies || [] })
    }

    singleton(name: string, definition: any, dependencies?: Array<string>) {
        this._services.set(name, { definition: definition, dependencies: dependencies || [], singleton: true })
    }

    get(name: string) {
        const c = this._services.get(name)

        if (c != undefined && this._isClass(c.definition)) {

            if (c.singleton) {
                const singletonInstance = this._singletons.get(name)
                if (singletonInstance) {
                    return singletonInstance
                } else {
                    const newSingletonInstance = this._createInstance(c)
                    this._singletons.set(name, newSingletonInstance)
                    return newSingletonInstance
                }
            }
            return this._createInstance(c)

        } else {
            return c.definition
        }
    }

    _getResolvedDependencies(service: any): any {
        let classDependencies = []
        if (service.dependencies.length > 0) {
            classDependencies = service.dependencies.map((dep: string) => {
                return this.get(dep)
            })
        }
        return classDependencies
    }

    _createInstance(service: any) {
        return new service.definition(...this._getResolvedDependencies(service)) 
    }

    _isClass(definition: any) {
        return typeof definition === 'function'
    }
}

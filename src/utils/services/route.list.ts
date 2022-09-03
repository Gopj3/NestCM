export class UtilsRouteList {
    public static getRouteList(router: any): void {
        const availableRoutes: [] = router.stack
            .map(layer => {
                if (layer.route) {
                    return {
                        route: {
                            path: layer.route?.path,
                            method: layer.route?.stack[0].method,
                        },
                    };
                }
            })
            .filter(item => item !== undefined);

        console.log(availableRoutes);
    }
}

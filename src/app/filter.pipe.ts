import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name:'filter'
})

export class FilterPipe implements PipeTransform {
    
    transform(resources: any, term: any): any {
        //check if search term is undefined
        if (term === undefined) return resources;
        
        //return updated resources with term
        return resources.filter(function(resource){
            return resource.title.toLowerCase().includes(term.toLowerCase());
        })
    }
}
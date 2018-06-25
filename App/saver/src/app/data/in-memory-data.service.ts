import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const incomes = [
      { id: 11, name: 'Mr. Nice', imgLink: 'link', mainDescription: 'desc.' },
      { id: 12, name: 'Narco', imgLink: 'link', mainDescription: 'desc.'  },
      { id: 13, name: 'Bombasto', imgLink: 'link', mainDescription: 'desc.'  },
      { id: 14, name: 'Celeritas', imgLink: 'link', mainDescription: 'desc.'  },
      { id: 15, name: 'Magneta', imgLink: 'link', mainDescription: 'desc.'  },
      { id: 16, name: 'RubberMan', imgLink: 'link', mainDescription: 'desc.'  },
      { id: 17, name: 'Dynama', imgLink: 'link', mainDescription: 'desc.'  },
      { id: 18, name: 'Dr IQ', imgLink: 'link', mainDescription: 'desc.'  },
      { id: 19, name: 'Magma', imgLink: 'link', mainDescription: 'desc.'  },
      { id: 20, name: 'Tornado', imgLink: 'link', mainDescription: 'desc.'  }
    ];
    return {incomes};
  }
}




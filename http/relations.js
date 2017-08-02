var conector = require('./connection');

// modelos

var anecdotas = require('./db/modeloAnecdotas')(conector);
var areas = require('./db/modeloAreas')(conector);
var campanas = require('./db/modeloCampanas')(conector);
var donativo = require('./db/modeloDonativo')(conector);
var eventos = require('./db/modeloEventos')(conector);
var imagenes = require('./db/modeloImagenes')(conector);
var institucion = require('./db/modeloInstitucion')(conector);
var pendiente = require('./db/modeloPendiente')(conector);
var progreso = require('./db/modeloProgreso')(conector);
var proyectos = require('./db/modeloProyectos')(conector);
var status = require('./db/modeloStatus')(conector);
var terminado = require('./db/modeloTerminado')(conector);
var usuarios = require('./db/modeloUsuarios')(conector);
var administrador = require('./db/modeloAdministrador')(conector);


//relaciones

areas.hasMany(campanas , {foreignKey: 'id_areas'});


proyectos.belongsTo(status);


institucion.hasMany(usuarios , {foreignKey: 'id_institucion'});
usuarios.hasMany(anecdotas , {foreignKey: 'id_usuarios'});
terminado.hasMany(anecdotas , {foreignKey: 'id_terminado'});
usuarios.hasMany(donativo , {foreignKey: 'id_usuarios'});
pendiente.hasMany(donativo , {foreignKey: 'id_pendiente'});

campanas.belongsToMany(proyectos , {as:'Proyecto', through: 'campana_proyectos'});
proyectos.belongsToMany(campanas , {as:'Campanas', through: 'campana_proyectos'});

proyectos.belongsToMany(usuarios , {through: 'proyectos_usuarios' , foreignKey: 'id_usuarios'});
usuarios.belongsToMany(proyectos , {through: 'proyectos_usuarios' , foreignKey: 'id_proyectos'});


status.belongsTo(pendiente , {foreignKey: 'id_pendiente'});
status.belongsTo(progreso , {foreignKey: 'id_progreso'});
status.belongsTo(terminado , {foreignKey: 'id_terminado'});

eventos.belongsTo(pendiente , {foreignKey: 'id_pendiente'});
eventos.belongsTo(progreso , {foreignKey: 'id_progreso'});
eventos.belongsTo(terminado , {foreignKey: 'id_terminado'});

imagenes.belongsTo(pendiente , {foreignKey: 'id_pendiente'});
imagenes.belongsTo(progreso , {foreignKey: 'id_progreso'});
imagenes.belongsTo(terminado , {foreignKey: 'id_terminado'});





module.exports.anecdotas = anecdotas;
module.exports.areas = areas;
module.exports.campanas = campanas;
module.exports.donativo = donativo;
module.exports.eventos = eventos;
module.exports.imagenes = imagenes;
module.exports.institucion = institucion;
module.exports.pendiente = pendiente;
module.exports.progreso = progreso;
module.exports.proyectos = proyectos;
module.exports.status = status;
module.exports.terminado = terminado;
module.exports.usuarios = usuarios;
module.exports.administrador = administrador;

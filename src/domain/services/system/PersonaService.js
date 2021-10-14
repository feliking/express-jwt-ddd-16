'use strict';

const debug = require('debug')('app:service:persona');
const Service = require('../Service');

module.exports = function userService (repositories, valueObjects, res) {
  const { PersonaRepository, Iop } = repositories;
  const {
    PersonaNombres,
    PersonaPrimerApellido,
    PersonaSegundoApellido,
    PersonaNombreCompleto,
    PersonaTipoDocumento,
    PersonaTipoDocumentoOtro,
    PersonaNroDocumento,
    PersonaFechaNacimiento,
    PersonaTelefono,
    PersonaMovil,
    PersonaNacionalidad,
    PersonaPaisNacimiento,
    PersonaGenero,
    PersonaObservacion,
    PersonaEstado,
    PersonaEstadoVerificacion
  } = valueObjects;

  async function findAll (params = {}, rol, idEntidad) {
    debug('Lista de personas|filtros');
    let lista;
    try {
      params['id_entidad'] = idEntidad;

      switch (rol) {
        case 'SUPERADMIN':
          params['id_roles'] = [1, 2, 3];
          params['id_entidad'] = null; // Lista de todas las entidades
          break;
        case 'ADMINISTRADOR':
          params['id_roles'] = [2, 3];
          break;
      }

      lista = await PersonaRepository.findAll(params);
    } catch (e) {
      return res.error(e);
    }

    if (!lista) {
      return res.warning(new Error(`Error al obtener la lista de personas`));
    }

    return res.success(lista);
  }

  async function contrastacion (persona, tipo = 1) {
    let data = {
      numero_documento: persona.nro_documento,
      fecha_nacimiento: persona.fecha_nacimiento,
      primer_apellido: persona.primer_apellido,
      nombres: persona.nombres
    };
    if (typeof data.numero_documento === 'string' && data.numero_documento.split('-').length > 1) {
      let doc = data.numero_documento.split('-');
      data.numero_documento = doc[0];
      data.complemento = doc[1];
    }
    if (typeof data.fecha_nacimiento === 'string' && data.fecha_nacimiento.split('-').length > 1) {
      let fechaArray = data.fecha_nacimiento.split('-');
      data.fecha_nacimiento = fechaArray[2] + '/' + fechaArray[1] + '/' + fechaArray[0];
    }
    if (persona.segundo_apellido) {
      data.segundo_apellido = persona.segundo_apellido;
    }
    let result = await Iop.segip.contrastacion(data, tipo);

    console.log('RESULTADO CONTRASTACION: ', result);
    if (result.warning) {
      data = {
        data: result.warning,
        estado: 'OBSERVADO_SEGIP'
      };
    } else if (result.error) {
      data = {
        data: result.error,
        estado: 'NO_EXISTE_SEGIP'
      };
    } else {
      let message = [];
      let keys = [
        { value: 'NumeroDocumento', text: 'Número de documento' },
        { value: 'Nombres', text: 'Nombres' },
        { value: 'PrimerApellido', text: 'Primer apellido' },
        { value: 'SegundoApellido', text: 'Segundo apellido' },
        { value: 'FechaNacimiento', text: 'Fecha de nacimiento' }
      ];
      if (data.complemento) {
        keys.push({ value: 'Complemento', text: 'Complemento' });
      }
      for (let i in keys) {
        if (result[keys[i].value] !== '') {
          if (result[keys[i].value] === 0) {
            message.push(`${keys[i].text} es incorrecto`);
          } else if (result[keys[i].value] === 2) {
            message.push(`${keys[i].text} no se pudo verificar esta información`);
          }
        }
      }
      data = {
        data: message.join(', '),
        estado: 'VERIFICADO_SEGIP'
      };
    }
    console.log('RESPUESTA CONTRASTACIÓN ======================', data);
    return data;
  }

  async function findById (id) {
    debug('Buscando persona por ID');

    return Service.findById(id, PersonaRepository, res, 'Persona');
  }

  async function find (params) {
    debug('Buscando persona por Parametros', params);

    let persona;
    try {
      persona = await PersonaRepository.find(params);
    } catch (e) {
      return res.error(e);
    }

    if (!persona) {
      return res.warning(new Error(`Persona not found`));
    }

    return res.success(persona);
  }

  async function createOrUpdate (data) {
    debug('Crear o actualizar persona');

    validate(data);

    return Service.createOrUpdate(data, PersonaRepository, res, 'Persona');
  }

  async function deleteItem (id) {
    debug('Eliminando persona');

    return Service.deleteItem(id, PersonaRepository, res, 'Persona');
  }

  function validate (data) {
    Service.validate(data, {
      nombres: PersonaNombres,
      primer_apellido: PersonaPrimerApellido,
      segundo_apellido: PersonaSegundoApellido,
      nombre_completo: PersonaNombreCompleto,
      tipo_documento: PersonaTipoDocumento,
      tipo_documento_otro: PersonaTipoDocumentoOtro,
      nro_documento: PersonaNroDocumento,
      fecha_nacimiento: PersonaFechaNacimiento,
      telefono: PersonaTelefono,
      movil: PersonaMovil,
      nacionalidad: PersonaNacionalidad,
      pais_nacimiento: PersonaPaisNacimiento,
      genero: PersonaGenero,
      observacion: PersonaObservacion,
      estado: PersonaEstado,
      estado_verificacion: PersonaEstadoVerificacion
    });
  }

  return {
    findAll,
    findById,
    find,
    createOrUpdate,
    deleteItem,
    contrastacion
  };
};

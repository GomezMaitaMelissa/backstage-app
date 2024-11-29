import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Paper } from '@material-ui/core';
import * as XLSX from 'xlsx';
import { Content, Header, Page } from '@backstage/core-components';
import { formatAcronym, validateDateRange } from '../../utils';
import { fetchRepositoryData } from './reportService';
import { ReportData } from '../../types';
import { catalogApiRef } from '@backstage/plugin-catalog-react';
import { useApi } from '@backstage/core-plugin-api';

export const ReportPage: React.FC = () => {
    const catalogApi = useApi(catalogApiRef);
    const [data, setData] = useState<ReportData[]>([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const loadData = async () => {
            const repoData = await fetchRepositoryData(catalogApi);
            setData(repoData);
        };

        loadData();
    });

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStartDate = e.target.value;
        setStartDate(newStartDate);

        if (endDate && !validateDateRange(newStartDate, endDate)) {
            setEndDate(''); // Reiniciar endDate si no cumple el rango
            // alert('La fecha de inicio debe estar dentro de un rango de 3 meses.');
        }
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEndDate = e.target.value;

        if (validateDateRange(startDate, newEndDate)) {
            setEndDate(newEndDate);
        } else {
            // alert('La fecha de fin debe estar dentro de un rango de 3 meses desde la fecha de inicio.');
        }
    };

    const filteredData = data.filter(d => {
        const creationDate = new Date(d.creationDate);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        return (!start || creationDate >= start) && (!end || creationDate <= end);
    });

    const exportToExcel = () => {
        // Definir las cabeceras de la tabla
        const headers = [
            {
                creatorName: "Nombre del Creador",
                crewName: "Nombre de Crew",
                applicationName: "Nombre de la Aplicación",
                applicationLetter: "Sigla de Aplicación",
                squad: "Squad",
                creationDate: "Fecha de Creación",
                repositoryName: "Nombre del Repositorio",
            }
        ];

        // Combinar las cabeceras con los datos filtrados
        const dataWithHeaders = headers.concat(
            filteredData.map(d => ({
                ...d,
                applicationLetter: formatAcronym(d.applicationLetter)
            }))
        );

        const colWidth = [
            { wpx: 130 }, // Nombre del Creador
            { wpx: 130 }, // Nombre de Crew
            { wpx: 140 }, // Nombre de la Aplicación
            { wpx: 130 }, // Sigla de Aplicación
            { wpx: 100 }, // Squad
            { wpx: 100 }, // Fecha de Creación
            { wpx: 140 }, // Nombre del Repositorio
        ];

        // Convertir a una hoja de Excel
        const worksheet = XLSX.utils.json_to_sheet(dataWithHeaders, { skipHeader: true });
        worksheet['!cols'] = colWidth;
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');

        // // Exportar el archivo Excel
        XLSX.writeFile(workbook, 'reporte.xlsx');
    };

    return (
        <div style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
            <div >
                <div
                    style={{
                        display: 'flex',
                        gap: '10rem',
                        marginBottom: '30px',
                        padding: '20px',
                        border: '2px solid #00A94F',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                        justifyContent: 'center',
                    }}
                >
                    <TextField
                        label="Fecha de inicio"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={startDate}
                        onChange={handleStartDateChange}
                    />
                    <TextField
                        label="Fecha de fin"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={endDate}
                        onChange={handleEndDateChange}
                    />
                </div>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ width: '180px' }}>Nombre del Creador</TableCell>
                                <TableCell style={{ width: '180px' }}>Nombre de Crew</TableCell>
                                <TableCell>Nombre de la Aplicación</TableCell>
                                <TableCell style={{ width: '120px' }}>Sigla de Aplicación</TableCell>
                                <TableCell style={{ width: '120px' }}>Squad</TableCell>
                                <TableCell style={{ width: '150px' }}>Fecha de Creación</TableCell>
                                <TableCell>Nombre del Repositorio</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.creatorName}</TableCell>
                                    <TableCell>{row.crewName}</TableCell>
                                    <TableCell>{row.applicationName}</TableCell>
                                    <TableCell>{formatAcronym(row.applicationLetter)}</TableCell>
                                    <TableCell>{row.squad}</TableCell>
                                    <TableCell>{row.creationDate}</TableCell>
                                    <TableCell>{row.repositoryName}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '1rem' }}
                    onClick={exportToExcel}
                >
                    Exportar a Excel
                </Button>
            </div>
        </div>
    );
};


export const CustomReportPage = () => {
    return (
        <Page themeId="report">
            <Header title="Reporte" subtitle=" de creación de Repositorios" />
            <Content>
                <ReportPage />
            </Content>
        </Page>
    );
};